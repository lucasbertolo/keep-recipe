import { Space, Typography } from "@/shared/components";
import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  recipe: Recipes.Recipe;
};

export const IngredientDetails = ({ recipe }: Props) => {
  if (!recipe.ingredients?.length) return null;

  return (
    <View style={{ marginVertical: 12 }}>
      <Typography variant="subtitle">Ingredientes</Typography>

      <Space type="md" />

      {recipe.ingredients?.map((ingredient) => (
        <View
          style={[
            styles.row,
            { justifyContent: "space-between", marginTop: 12 },
          ]}
          key={ingredient.name}
        >
          <Typography>{ingredient.name} </Typography>
          <Typography>{ingredient.quantity} </Typography>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 6,
  },
});
