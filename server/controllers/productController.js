const productService = require('../services/productService.js');
const aiService = require('../services/aiService.js');
const Profile = require('../models/profileModel.js');

const getProductByBarcode = async (req, res) => {
  const { barcode } = req.params;
  const userId = req.userId;

  console.log('Fetching product for barcode:', barcode); // Log the barcode

  try {
    // Fetch product details from the Open Food Facts API
    const product = await productService.fetchProductDetails(barcode);

    if (!product) {
      console.log('Product not found for barcode:', barcode); // Log if product is not found
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Product details fetched successfully:', product); // Log fetched product

    // Fetch user profile
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      console.log('User profile not found for userId:', userId); // Log if profile is not found
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Analyze product using AI
    const analysisResult = await aiService.analyzeProduct(product, profile);

    // Send response
    res.json({
      product: {
        name: product.product_name,
        image: product.image_url,
        nutrients: product.nutriments,
      },
      healthRating: analysisResult.healthRating,
      recommendation: analysisResult.recommendation,
    });
  } catch (error) {
    console.error('Error in getProductByBarcode:', error.message); // Log the error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getProductByBarcode };
