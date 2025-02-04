import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "../Assets/CSS/Results.css";

const jsonData = {
  AI_Health_Score: 70,
  Ingredient_Classification: {
    Oats: {
      Classification: "🟢 Beneficial",
      Explanation: "Good source of fiber, which aids digestion and can help regulate blood sugar levels.",
    },
    "Wheat Flour": {
      Classification: "🟡 Neutral",
      Explanation: "Provides carbohydrates for energy but can be high in refined carbohydrates, depending on the type of wheat flour used. Whole wheat flour would be more beneficial.",
    },
    "Brown Sugar": {
      Classification: "🟡 Neutral",
      Explanation: "Provides sweetness but is a refined sugar; moderation is key. Consider alternatives like maple syrup or stevia.",
    },
    "Vegetable Oil": {
      Classification: "🟡 Neutral",
      Explanation: "Provides fat, but the type of oil significantly impacts health. Unsaturated fats are healthier than saturated or trans fats. Specification needed.",
    },
    "Baking Soda": {
      Classification: "🟡 Neutral",
      Explanation: "Baking agent; generally safe in small amounts.",
    },
    Salt: {
      Classification: "🟡 Neutral",
      Explanation: "Essential in small amounts, but excessive consumption can be harmful. Moderation is key.",
    },
    Cinnamon: {
      Classification: "🟢 Beneficial",
      Explanation: "Rich in antioxidants, may help regulate blood sugar levels.",
    },
  },
  Sustainability_Score: 65,
  Personalized_Recommendations: [
    {
      Recommendation: "Oatmeal with berries and nuts",
      Reason: "Provides fiber, antioxidants, and healthy fats, replacing refined carbohydrates and added sugar.",
    },
    {
      Recommendation: "Whole wheat crackers with avocado",
      Reason: "Replaces refined grains with whole grains, adds healthy fats and fiber.",
    },
  ],
  Overall_Star_Rating: 4,
};
const Results = (props) => {
  const [data,setData]=useState(props.product);
  return (
    <div className="container mt-4">
      {!props.product && setData(jsonData)}
      <h2 className="mb-3">Barcode Scan Results</h2>

      <div className="card p-3 mb-3">
        <h4>AI Health Score: {data.AI_Health_Score}</h4>
      </div>

      <div className="card p-3 mb-3">
        <h4>Ingredient Classification</h4>
        <ul className="list-group">
          {Object.entries(data.Ingredient_Classification).map(([key, value]) => (
            <li className="list-group-item" key={key}>
              <strong>{key}:</strong> {value.Classification} - {value.Explanation}
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-3 mb-3">
        <h4>Sustainability Score: {data.Sustainability_Score}</h4>
      </div>

      <div className="card p-3 mb-3">
        <h4>Personalized Recommendations</h4>
        <ul className="list-group">
          {data.Personalized_Recommendations.map((item, index) => (
            <li className="list-group-item" key={index}>
              <strong>{item.Recommendation}</strong> {item.Reason}
            </li>
          ))}
        </ul>
      </div>

      <div className="card p-3 mb-5">
        <h4>Overall Star Rating: ⭐ {data.Overall_Star_Rating}/5</h4>
      </div>
      {/* {props.product && <p>{JSON.stringify(props.product)}</p>} */}
    </div>
  );
};

export default Results;