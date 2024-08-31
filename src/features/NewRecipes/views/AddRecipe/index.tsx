import { ProgressSteps } from "@/shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
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
  TimeForm,
} from "../../components";
import { useAddRecipe } from "../../queries";
import { recipeSchema } from "../../validations";

export const AddRecipe = () => {
  const [hasInit, setHasInit] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { mutate: addRecipe } = useAddRecipe();

  const methods = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<InferType<typeof recipeSchema>> = (data) => {
    const model: Recipes.Recipe = {
      ...methods.getValues(),
      userId: "",
      totalTime: (data.cookTime ?? 0) + (data.prepTime ?? 0),
      steps: data.steps?.map((s) => s.description),
      difficulty: data.difficulty as Recipes.Difficulty,
    };

    addRecipe({ recipe: model });
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
      <TimeForm />,
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
          onSubmit={methods.handleSubmit(onSubmit)}
        />
      </View>
    </FormProvider>
  );
};
