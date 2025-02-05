import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

const jsonData = {
  AI_Health_Score: 70,
  Ingredient_Classification: {
    Oats: {
      Classification: "🟢 Beneficial",
      Explanation:
        "Good source of fiber, which aids digestion and can help regulate blood sugar levels.",
    },
    "Wheat Flour": {
      Classification: "🟡 Neutral",
      Explanation:
        "Provides carbohydrates for energy but can be high in refined carbohydrates, depending on the type of wheat flour used. Whole wheat flour would be more beneficial.",
    },
    "Brown Sugar": {
      Classification: "🟡 Neutral",
      Explanation:
        "Provides sweetness but is a refined sugar; moderation is key. Consider alternatives like maple syrup or stevia.",
    },
    "Vegetable Oil": {
      Classification: "🟡 Neutral",
      Explanation:
        "Provides fat, but the type of oil significantly impacts health. Unsaturated fats are healthier than saturated or trans fats. Specification needed.",
    },
    "Baking Soda": {
      Classification: "🟡 Neutral",
      Explanation: "Baking agent; generally safe in small amounts.",
    },
    Salt: {
      Classification: "🟡 Neutral",
      Explanation:
        "Essential in small amounts, but excessive consumption can be harmful. Moderation is key.",
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
      Reason:
        "Provides fiber, antioxidants, and healthy fats, replacing refined carbohydrates and added sugar.",
    },
    {
      Recommendation: "Whole wheat crackers with avocado",
      Reason:
        "Replaces refined grains with whole grains, adds healthy fats and fiber.",
    },
  ],
  Overall_Star_Rating: 4,
};

const Results = (props) => {
  const data = (props.product || jsonData);

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
        Barcode Scan Results
      </Typography>

      <Card sx={{ mb: 3, bgcolor: "#f0f8ff", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5">AI Health Score: {data.AI_Health_Score}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, bgcolor: "#f8f9fa", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5">Ingredient Classification</Typography>
          <List>
            {Object.entries(data.Ingredient_Classification).map(([key, value]) => (
              <ListItem key={key} divider>
                <ListItemText
                  primary={<strong>{key}: {value.Classification}</strong>}
                  secondary={value.Explanation}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, bgcolor: "#f0f8ff", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5">Sustainability Score: {data.Sustainability_Score}</Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, bgcolor: "#f8f9fa", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5">Personalized Recommendations</Typography>
          <List>
            {data.Personalized_Recommendations.map((item, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={<strong>{item.Recommendation}</strong>}
                  secondary={item.Reason}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 5, bgcolor: "#f0f8ff", boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5">Overall Star Rating: ⭐ {data.Overall_Star_Rating}/5</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Results;
