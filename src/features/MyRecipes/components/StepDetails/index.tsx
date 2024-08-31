import { Space, Typography } from "@/shared/components";
import React from "react";
import { View } from "react-native";

type Props = {
  recipe: Recipes.Recipe;
};

export const StepDetails = ({ recipe }: Props) => {
  if (!recipe.steps?.length) return null;

  return (
    <View style={{ marginBottom: 18 }}>
      <Typography variant="subtitle" fontType="semibold">
        Passos
      </Typography>

      <Space />

      {recipe.steps?.map((step, index) => (
        <View style={{ marginVertical: 6 }} key={step}>
          <Typography fontType="medium">Passo {index + 1} </Typography>

          <Typography>{step} </Typography>
        </View>
      ))}
    </View>
  );
};
