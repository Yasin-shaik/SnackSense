import {React, useState} from 'react'
import axios from 'axios';
export default function ScanQR(props) {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
        {
          headers: { Authorization: `Bearer ${props.token}` },
        }
      );
      setProduct(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch product details');
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

      {error && <p>{error}</p>}

      {product && <p>{JSON.stringify(product, null, 2)}</p>}
    </div>
  )
}
