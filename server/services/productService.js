const axios = require('axios');
const { OPEN_FOOD_FACTS_API_URL } = require('../config/constants');

const fetchProductDetails = async (barcode) => {
  try {
    const response = await axios.get(
      `${OPEN_FOOD_FACTS_API_URL}/${barcode}.json`
    );
    console.log('API Response:', response.data); // Log the API response

    if (!response.data.product) {
      throw new Error('Product not found in Open Food Facts database');
    }

    return response.data.product;
  } catch (error) {
    console.error('Error fetching product details:', error.message); // Log the error
    throw new Error(
      'Failed to fetch product details. Please check the barcode and try again.'
    );
  }
};

module.exports = { fetchProductDetails };
