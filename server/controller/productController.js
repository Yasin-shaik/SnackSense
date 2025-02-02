const aiService = require('../services/aiService.js');
const getProductByBarcode = async (req, res) => {
  const { barcode } = req.params;
  const userId = req.userId;

  try {
    const product = await productService.fetchProductDetails(barcode);

    // Check if required fields are present
    if (!product.product_name || !product.nutriments) {
      return res.status(404).json({ error: 'Product data is incomplete' });
    }

    const profile = await Profile.findOne({ userId });

    const analysisResult = await aiService.analyzeProduct(product, profile);

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
    res.status(500).json({ error: error.message });
  }
};
