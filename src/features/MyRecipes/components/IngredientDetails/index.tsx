import { Space, Typography } from "@/shared/components";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

type Props = {
  recipe?: Recipes.Recipe;
};

export const IngredientDetails = ({ recipe }: Props) => {
  if (!recipe?.ingredients?.length) return null;

  return (
    <>
      <Divider />

      <View style={styles.container}>
        <Typography variant="subtitle">Ingredientes</Typography>

        <Space type="md" />

        {recipe.ingredients?.map((ingredient) => (
          <View style={styles.row} key={ingredient.name}>
            <Typography>{ingredient.name} </Typography>
            <Typography>{ingredient.quantity} </Typography>
          </View>
        ))}
      </View>
      <Divider />
      <Space type="lg" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    justifyContent: "space-between",
    marginTop: 12,
  },
});
