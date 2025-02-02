const analyzeProduct = (product, profile) => {
  // const { nutrients } = product;
  const { allergies = [], preferences = [], healthConditions = [] } = profile;

  let healthRating = 0;

  // Add points for healthy nutrients
  if (product.nutriments.fiber) healthRating += product.nutriments.fiber * 2;
  if (product.nutriments.proteins)
    healthRating += product.nutriments.proteins * 2;

  // Deduct points for unhealthy nutrients
  if (product.nutriments.sugar) score -= product.nutriments.sugar;
  if (product.nutriments['saturated-fat'])
    healthRating -= product.nutriments['saturated-fat'];

  // Adjust for allergies, preferences, and health conditions
  if (allergies.some((allergy) => product.allergens?.includes(allergy))) {
    healthRating = 0;
  }

  if (preferences.includes('vegan') && product.ingredients?.includes('milk')) {
    healthRating = 0;
  }

  // if (healthConditions.includes('diabetes') && nutriments.sugar > 10) {
  //   healthRating = 0;
  // }

  // Final recommendation
  const recommendation =
    healthRating > 50
      ? 'This product is healthy!'
      : 'This product is unhealthy.';

  return { healthRating, recommendation };
};

module.exports = { analyzeProduct };
