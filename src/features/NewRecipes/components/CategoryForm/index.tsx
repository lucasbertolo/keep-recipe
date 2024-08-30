import { RadioButton } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioButton as RNPRadioButton } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";

export const CategoryForm = () => {
  const { control } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <RNPRadioButton.Group onValueChange={onChange} value={value}>
            <RadioButton
              selected={value === "meal"}
              onPress={() => onChange("meal")}
              label="Refeição"
              description="Almoços, jantares e cafés da manhã"
            />

            <RadioButton
              selected={value === "snack"}
              onPress={() => onChange("snack")}
              label="Snack"
              description="Alimentos rápidos, de pequenas porções"
            />

            <RadioButton
              selected={value === "dessert"}
              onPress={() => onChange("dessert")}
              label="Sobremesa"
              description="Doce que é servido após o prato principal"
            />
          </RNPRadioButton.Group>
        )}
      />
    </ContainerForm>
  );
};
