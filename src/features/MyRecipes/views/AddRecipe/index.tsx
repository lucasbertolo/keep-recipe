import { ProgressSteps } from "@/shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { InferType } from "yup";
import {
  CategoryForm,
  DifficultyForm,
  GeneralForm,
  HealthInfoForm,
  IngredientsForm,
  Introduction,
  PhotosForm,
  RecipeDetailsForm,
  StepsForm,
  TagsForm,
} from "../../components";
import { recipeSchema } from "../../validations";

export const AddRecipe = () => {
  const [hasInit, setHasInit] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {},
  });

  const onSubmit = (data?: InferType<typeof recipeSchema>) => {
    console.log("Form Data:", data);
  };

  const forms = useMemo(
    () => [
      <RecipeDetailsForm />,
      <CategoryForm />,
      <HealthInfoForm />,
      <IngredientsForm />,
      <StepsForm />,
      <TagsForm />,
      <DifficultyForm />,
      <GeneralForm />,
      <PhotosForm />,
    ],
    [],
  );

  if (!hasInit) return <Introduction action={() => setHasInit(true)} />;

  return (
    <FormProvider {...methods}>
      <View style={{ flex: 1 }}>
        <ProgressSteps
          currentStep={currentStep}
          setStep={setCurrentStep}
          content={forms}
          onSubmit={() => onSubmit()}
        />
      </View>
    </FormProvider>
  );
};
