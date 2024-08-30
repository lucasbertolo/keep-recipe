import { TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";

export const RecipeDetailsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
      <Typography variant="heading">Detalhes</Typography>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Título"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.title}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Descrição"
            placeholder="Descrição"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            numberOfLines={5}
            multiline
            error={!!errors.description}
          />
        )}
      />
    </ContainerForm>
  );
};
