module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/healthapp',
  JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret_key',
  OPEN_FOOD_FACTS_API_URL: 'https://world.openfoodfacts.org/api/v0/product',
};
