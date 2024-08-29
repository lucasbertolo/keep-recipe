import {
  Checkbox,
  RadioButton,
  Space,
  TextInput,
  Typography,
} from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ScrollView } from "react-native";
import { RadioButton as RNPRadioButton } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { SectionLabel } from "../SectionLabel";

export const RecipeDetailsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 12 }}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Title"
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
            label="Description"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline
            error={!!errors.description}
          />
        )}
      />

      <SectionLabel label="Categoria" />

      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <RNPRadioButton.Group onValueChange={onChange} value={value}>
            <RadioButton
              selected={value === "main meal"}
              onPress={() => onChange("main meal")}
              label="Refeição"
            />

            <RadioButton
              selected={value === "snack"}
              onPress={() => onChange("snack")}
              label="Snack"
            />

            <RadioButton
              selected={value === "dessert"}
              onPress={() => onChange("dessert")}
              label="Sobremesa"
            />
          </RNPRadioButton.Group>
        )}
      />

      <SectionLabel label="Características" />

      <Controller
        control={control}
        name="isVegan"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Vegana"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />
      <Controller
        control={control}
        name="isVegetarian"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Vegetariana"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />
      <Controller
        control={control}
        name="isGlutenFree"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Sem glúten"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />
      <Controller
        control={control}
        name="isDairyFree"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Sem laticínio"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />
    </ScrollView>
  );
};
