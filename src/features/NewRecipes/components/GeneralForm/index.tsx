import { TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput as PTextInput } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const GeneralForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
      <TitleForm
        title="Deixe sua receita mais completa"
        subtitle="Informações gerais"
      />

      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Avaliação"
            placeholder="Sua nota para o prato (1 a 10)"
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={onChange}
            value={value?.toString()}
            error={!!errors.rating}
            errorText={errors.rating?.message}
            left={<PTextInput.Icon icon="star-settings-outline" size={18} />}
            returnKeyType="next"
          />
        )}
      />

      <Controller
        control={control}
        name="servings"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Porções"
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={onChange}
            value={value?.toString()}
            error={!!errors.servings}
            errorText={errors.servings?.message}
            left={<PTextInput.Icon icon="room-service-outline" size={18} />}
            returnKeyType="next"
          />
        )}
      />

      <Controller
        control={control}
        name="source"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Fonte"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.source}
            autoCapitalize="none"
            errorText={errors.source?.message}
            left={<PTextInput.Icon icon="link" size={18} />}
            returnKeyType="next"
          />
        )}
      />

      <Controller
        control={control}
        name="observation"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Observações"
            placeholder="Anote suas observações"
            onBlur={onBlur}
            onChangeText={onChange}
            multiline
            value={value}
            error={!!errors.observation}
            errorText={errors.observation?.message}
            left={<PTextInput.Icon icon="note-edit-outline" size={18} />}
            returnKeyType="done"
          />
        )}
      />
    </ContainerForm>
  );
};
