import { CarouselPhotos, Space, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { TitleForm } from "../TitleForm";

export const PhotosForm = () => {
  const { control, setValue, getValues } =
    useFormContext<InferType<typeof recipeSchema>>();

  const handleTakePhoto = (photoUri: string) => {
    const prevPhotos = getValues("photos");

    setValue("photos", [...(prevPhotos ?? []), photoUri]);
  };

  const handleRemovePhoto = (photoUri: string) => {
    const prevPhotos = getValues("photos");

    const filteredPhotos = prevPhotos.filter((s) => s !== photoUri);

    setValue("photos", filteredPhotos);
  };

  return (
    <View style={{ flex: 1, paddingTop: 18 }}>
      <TitleForm title="Adicione imagens à sua receita" />

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
    </View>
  );
};
