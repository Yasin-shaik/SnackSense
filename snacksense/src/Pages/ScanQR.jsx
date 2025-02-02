import { React, useState } from "react";
import axios from "../Api";
export default function ScanQR() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [prompt, setPrompt] = useState("");
  function extractAndParseJson(inputString) {
    try {
      // Find the starting position of '{'
      const startIndex = inputString.indexOf('{');
      if (startIndex === -1) {
        return { error: "No JSON object found in the input" };
      }
  
      // Find the ending position of ```
      const endIndex = inputString.indexOf("```", startIndex);
      const jsonString = endIndex !== -1 
        ? inputString.substring(startIndex, endIndex)  // Extract until ```
        : inputString.substring(startIndex);           // If no ```, take the rest
  
      // Parse JSON
      return JSON.parse(jsonString);
    } catch (error) {
      return { error: "Invalid JSON format", details: error.message };
    }
  }
  const handleScan = async () => {
    try {
      setPrompt(`Assume You are a health and nutrition expert. Given the following product barcode, analyze and return the following six results:   
### *Product barcode: ${barcode}*



### *Required Analysis (Return the results in structured JSON format):*  
*AI Health Score (0-100 scale)*:  
   - Analyze the ingredients and nutrition data.  
   - Adjust the score based on harmful and beneficial factors.  
   - Consider user-specific health conditions (e.g., high sugar is bad for diabetics).  
   
*Ingredient Classification:*  
   - Categorize each ingredient as:  
     - 🟢 *Beneficial* (Good for health)  
     - 🟡 *Neutral* (No major impact)  
     - 🔴 *Harmful* (Linked to health risks)  
   - Provide a brief explanation for each classification.  

*Allergen Alerts:*  
   - Highlight any allergens present in the ingredients list.  
   - Compare with user preferences and flag any risky ingredients.

*Sustainability Insights:*  
   - Rate environmental impact based on packaging & processing.  
   - Provide a *Sustainability Score (0-100)* where 100 = Most Eco-friendly.  

*Personalized Recommendations:*  
   - Suggest healthier alternatives based on user preferences.  
   - Ensure similar taste but better nutritional value.  

*Overall Star Rating (0-5 stars):*  
   - Combine all factors (Health Score, Ingredients, Allergens, Sustainability, Recommendations).  
   - Normalize into a *5-star rating system* for easy user understanding. 

### *Output Format:* 
{
  "AI_Health_Score": 42,
  "Ingredient_Classification": {
    "Rice Meal": "Neutral",
    "Edible Vegetable Oil": "Neutral",
    "Corn Meal": "Neutral",
    "Gram Meal": "Neutral",
    "Spices and Condiments": "Beneficial",
    "Citric Acid": "Harmful",
    "Tartaric Acid": "Harmful"
  },
  "Allergen_Alerts": ["No allergens detected"],
  "Sustainability_Score": 40,
  "Personalized_Recommendations": ["Baked Whole Wheat Chips", "Air-Popped Popcorn"],
  "Overall_Star_Rating":3.5
}

`);
      const openAPI = await axios.post("/openAI/generate", { prompt });
      const jsonOpenAPI=extractAndParseJson(openAPI.data.message.response.candidates[0].content.parts[0].text);
      setProduct(jsonOpenAPI);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setProduct(null);
    }
  };
  return (
    <div>
      <h2>Barcode Scanner</h2>
      <input
        type="text"
        placeholder="Enter barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button onClick={handleScan}>Scan</button>
      {product && <p>{JSON.stringify(product, null, 2)}</p>}
    </div>
  );
}
