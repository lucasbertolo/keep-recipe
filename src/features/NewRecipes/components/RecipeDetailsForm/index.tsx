import { TextInput } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const RecipeDetailsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
      <TitleForm title="Descreva sua receita" subtitle="Detalhes" />

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
            errorText={errors.title?.message}
            returnKeyType="next"
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
            returnKeyType="done"
          />
        )}
      />
    </ContainerForm>
  );
};
