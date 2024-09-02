import { Space, Typography } from "@/shared/components";
import React from "react";
import { View } from "react-native";
import { Divider } from "react-native-paper";

type Props = {
  recipe?: Recipes.Recipe;
};

export const StepDetails = ({ recipe }: Props) => {
  if (!recipe?.steps?.length) return null;

  return (
    <>
      <View style={{ marginVertical: 12 }}>
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
      <Divider />
      <Space />
    </>
  );
};
