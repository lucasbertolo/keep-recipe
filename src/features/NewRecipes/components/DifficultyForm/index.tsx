import { If, RadioButton, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RadioButton as RNPRadioButton, useTheme } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const DifficultyForm = () => {
  const theme = useTheme();
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  return (
    <ContainerForm>
      <TitleForm
        title="Qual foi a dificuldade em fazer esta receita?"
        subtitle="Preparo"
      />

      <Controller
        control={control}
        name="difficulty"
        render={({ field: { onChange, value } }) => (
          <RNPRadioButton.Group onValueChange={onChange} value={value ?? ""}>
            <RadioButton
              selected={value === "easy"}
              onPress={() => onChange("easy")}
              label="Fácil"
              description="Não exige muito preparo ou cuidados"
            />

            <RadioButton
              selected={value === "medium"}
              onPress={() => onChange("medium")}
              label="Médio"
              description="Requer atenção no preparo ou itens especiais"
            />

            <RadioButton
              selected={value === "hard"}
              onPress={() => onChange("hard")}
              label="Díficil"
              description="Requer muita atenção e/ou preparo prévio"
            />
          </RNPRadioButton.Group>
        )}
      />

      <If condition={!!errors.difficulty?.message}>
        <Typography color={theme.colors.error}>
          {errors.difficulty?.message}
        </Typography>
      </If>
    </ContainerForm>
  );
};
