import { Typography } from "@/shared/components";
import React from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { Divider, IconButton } from "react-native-paper";
import { useRemoveRecipe } from "../../queries";
import { useToast } from "@/shared/hooks";
import { useMyRecipes } from "../../provider";
import { useBottomSheet } from "@gorhom/bottom-sheet";

export const MenuDetail = () => {
  const { close } = useBottomSheet();
  const { showToast } = useToast();
  const { selectedRecipe } = useMyRecipes();
  const { mutate: removeRecipe } = useRemoveRecipe();

  const handleShare = () => {
    showToast({
      type: "success",
      message:
        "Em breve disponibilizaremos essa opção, obrigado pela compreensão",
    });
  };

  const handleRemove = () => {
    const title = "Remover receita";

    const message = "Essa ação não poderá ser desfeita, deseja continuar?";

    Alert.alert(title, message, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: () => {
          removeRecipe({ recipeId: selectedRecipe?.id ?? "" });
          close();
        },
      },
    ]);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton icon="trash-can-outline" size={18} />
        <TouchableOpacity onPress={handleRemove}>
          <Typography>Remover receita</Typography>
        </TouchableOpacity>
      </View>

      <Divider />

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton icon="share-outline" size={18} />

        <TouchableOpacity onPress={handleShare}>
          <Typography>Compartilhar</Typography>
        </TouchableOpacity>
      </View>

      <Divider />
    </View>
  );
};
