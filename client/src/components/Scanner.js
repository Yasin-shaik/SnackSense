import React, { useState } from 'react';
import axios from 'axios';
import './Scanner.css';

const Scanner = ({ token }) => {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${barcode}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('API Response:', response.data); // Log the API response
      setProduct(response.data);
      setError('');
    } catch (err) {
      console.error(
        'Error fetching product details:',
        err.response?.data || err.message
      ); // Log the error
      setError(
        'Failed to fetch product details. Please check the barcode and try again.'
      );
      setProduct(null);
    }
  };

  return (
    <div className="scanner-container">
      <h2>Barcode Scanner</h2>
      <div className="scanner-input">
        <input
          type="text"
          placeholder="Enter barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
        />
        <button onClick={handleScan}>Scan</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {product && (
        <div className="product-details">
          <h3>{product.product.name}</h3>
          <img src={product.product.image} alt={product.product.name} />
          <p>
            <strong>Health Rating:</strong> {product.healthRating}
          </p>
          <p>
            <strong>Recommendation:</strong> {product.recommendation}
          </p>
          <h4>Nutritional Information</h4>
          <ul>
            <li>
              <strong>Fiber:</strong> {product.product.nutrients.fiber || 'N/A'}
              g
            </li>
            <li>
              <strong>Protein:</strong>{' '}
              {product.product.nutrients.proteins || 'N/A'}g
            </li>
            <li>
              <strong>Sugar:</strong> {product.product.nutrients.sugar || 'N/A'}
              g
            </li>
            <li>
              <strong>Saturated Fat:</strong>{' '}
              {product.product.nutrients['saturated-fat'] || 'N/A'}g
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Scanner;
