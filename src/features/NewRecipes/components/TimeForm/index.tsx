import { TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput as PTextInput } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";

export const TimeForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
      <Typography variant="heading">Detalhes</Typography>
      <Controller
        control={control}
        name="prepTime"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Tempo de preparo"
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={onChange}
            value={value?.toString()}
            error={!!errors.prepTime}
            left={<PTextInput.Icon icon="clock-outline" size={18} />}
          />
        )}
      />

      <Controller
        control={control}
        name="cookTime"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Tempo no forno"
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={onChange}
            value={value?.toString()}
            error={!!errors.cookTime}
            left={<PTextInput.Icon icon="clock-outline" size={18} />}
          />
        )}
      />
    </ContainerForm>
  );
};
