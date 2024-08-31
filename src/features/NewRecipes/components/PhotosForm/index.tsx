import { CarouselPhotos, If, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { TitleForm } from "../TitleForm";
import { useTheme } from "react-native-paper";

export const PhotosForm = () => {
  const theme = useTheme();

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    clearErrors,
  } = useFormContext<InferType<typeof recipeSchema>>();

  const handleTakePhoto = (photoUri: string) => {
    const prevPhotos = getValues("photos");

    setValue("photos", [...(prevPhotos ?? []), photoUri]);

    clearErrors("photos");
  };

  const handleRemovePhoto = (photoUri: string) => {
    const prevPhotos = getValues("photos");

    const filteredPhotos = prevPhotos?.filter((s) => s !== photoUri);

    setValue("photos", filteredPhotos);
  };

  return (
    <ScrollView style={{ paddingTop: 18 }}>
      <View style={{ padding: 18 }}>
        <TitleForm title="Adicione imagens à sua receita" />

        <If condition={!!errors.photos?.message}>
          <Typography color={theme.colors.error}>
            {errors.photos?.message}
          </Typography>
        </If>
      </View>

      <Controller
        control={control}
        name="photos"
        render={({ field: { value } }) => (
          <CarouselPhotos
            photos={value ?? []}
            takePhoto={handleTakePhoto}
            removePhoto={handleRemovePhoto}
          />
        )}
      />
    </ScrollView>
  );
};
