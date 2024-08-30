import { CarouselPhotos, Space, Typography } from "@/shared/components";
import React, { useState } from "react";
import { View } from "react-native";

export const PhotosForm = () => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handleTakePhoto = (photoUri: string) => {
    setPhotos((prevPhotos) => [...prevPhotos, photoUri]);
  };

  return (
    <View style={{ flex: 1 }}>
      <Space type="lg" />
      <Typography variant="subtitle" style={{ marginLeft: 24 }}>
        Adicione imagens à sua receita
      </Typography>
      <Space type="lg" />

      <CarouselPhotos photos={photos} takePhoto={handleTakePhoto} />
    </View>
  );
};
