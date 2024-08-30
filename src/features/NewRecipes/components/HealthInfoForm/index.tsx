import { Checkbox } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { SectionLabel } from "../SectionLabel";
import { ContainerForm } from "../ContainerForm";

export const HealthInfoForm = () => {
  const { control } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
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
    </ContainerForm>
  );
};
