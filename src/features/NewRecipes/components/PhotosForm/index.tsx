import { CarouselPhotos, Space, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";

export const PhotosForm = () => {
  const { control, setValue, getValues } =
    useFormContext<InferType<typeof recipeSchema>>();

  const handleTakePhoto = (photoUri: string) => {
    const prevPhotos = getValues("photos");

    setValue("photos", [...(prevPhotos ?? []), photoUri]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Space type="lg" />
      <Typography variant="subtitle" style={{ marginLeft: 24 }}>
        Adicione imagens à sua receita
      </Typography>
      <Space type="lg" />

      <Controller
        control={control}
        name="photos"
        render={({ field: { value } }) => (
          <CarouselPhotos photos={value ?? []} takePhoto={handleTakePhoto} />
        )}
      />
    </View>
  );
};
