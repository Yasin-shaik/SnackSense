import { React, useState } from 'react';
import '../Assets/CSS/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../Api';
import { useNavigate } from 'react-router-dom';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';

export default function ScanQR(props) {
  const [barcode, setBarcode] = useState('');
  const [scanning, setScanning] = useState(false);
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleScan = async () => {
    if (!barcode) {
      alert('Please scan a barcode first.');
      return;
    }

    try {
      const resp = await axios.get(`
        https://world.openfoodfacts.org/api/v3/product/${barcode}.json`
      );

      setPrompt(`You are a health and nutrition expert. Given the following product details, analyze and must return the results exactly as the output format:  

### Product Details: ${JSON.stringify(resp.data)} 

- User Preferences & Health Metrics:  
  - Diet Type: {Vegan/Keto/Diabetic/etc.}  
  - Health Concerns: {Diabetes/Hypertension/Weight Loss/etc.}  
  - Allergies: {Peanuts, Gluten, Dairy, etc.}  

### Required Analysis (Return the results in structured JSON format):  
{
  "AI_Health_Score": 80,
  "Ingredient_Classification": {
    "Oats": { "Classification": "🟢 Beneficial", "Explanation": "Rich in fiber" },
    "Sugar": { "Classification": "🔴 Harmful", "Explanation": "High glycemic impact" }
  },
  "Sustainability_Score": 70,
  "Personalized_Recommendations": ["Replace sugar with honey"],
  "Overall_Star_Rating": 4
}`);

      const openAPI = await axios.post('/openAI/generate', { prompt });
      const resultData = JSON.parse(openAPI.data.message.response);
      props.setProduct(resultData);
      navigate('/results');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      props.setProduct(null);
    }
  };

  return (
    <div className="bg-cover d-flex flex-column align-items-center justify-content-center mt-10">
      <main className="container text-center py-1 overlay-content">
        {/* Welcome Section */}
        <section className="text-white mb-2 welcome-section">
          <h1 className="display-4 fw-bold">
            Welcome! Let's make healthier snack choices!
          </h1>
          <p className="lead">
            Your health insights, diet plans, and barcode scanner are just a tap
            away
          </p>
          <div className="bg-white rounded mx-auto w-100 max-w-3xl h-48"></div>
        </section>

        {/* Barcode Scanner Component */}
        <section className="scan-box mx-auto p-4 border rounded shadow-lg d-flex flex-column align-items-center">
          <h2 className="h4 fw-bold">Scan Your Snack</h2>
          <p>Scan the barcode of a product to get health insights!</p>

          {/* Barcode Scanner */}
          {scanning && (
            <BarcodeScannerComponent
              width={300}
              height={250}
              onUpdate={(err, result) => {
                if (result) {
                  setBarcode(result.text);
                  setScanning(false);
                }
              }}
            />
          )}

          <div className="scan-button-container mt-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setScanning(true)}
            >
              Start Scanning
            </button>
            <input
              type="text"
              value={barcode}
              className="form-control mt-2"
              readOnly
            />
            <button
              className="btn btn-warning btn-lg mt-2"
              onClick={handleScan}
            >
              Analyze Product
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}