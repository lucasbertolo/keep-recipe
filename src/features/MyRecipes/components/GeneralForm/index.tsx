import { TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextInput as PTextInput } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";

export const GeneralForm = () => {
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
            left={<PTextInput.Icon icon="star-settings-outline" size={18} />}
          />
        )}
      />

      <Controller
        control={control}
        name="rating"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Porções"
            onBlur={onBlur}
            keyboardType="numeric"
            onChangeText={onChange}
            value={value?.toString()}
            error={!!errors.rating}
            left={<PTextInput.Icon icon="room-service-outline" size={18} />}
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
            left={<PTextInput.Icon icon="note-edit-outline" size={18} />}
          />
        )}
      />
    </ContainerForm>
  );
};
