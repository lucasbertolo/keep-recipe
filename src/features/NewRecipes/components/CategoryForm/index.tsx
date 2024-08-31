import { If, RadioButton, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioButton as RNPRadioButton, useTheme } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const CategoryForm = () => {
  const theme = useTheme();

  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
      <TitleForm title="Qual a categoria?" />

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

      <If condition={!!errors.category?.message}>
        <Typography color={theme.colors.error}>
          {errors.category?.message}
        </Typography>
      </If>
    </ContainerForm>
  );
};
