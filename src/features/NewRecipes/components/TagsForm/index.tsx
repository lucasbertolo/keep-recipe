import { Button, TextInput } from "@/shared/components";
import { useToast } from "@/shared/hooks";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { View } from "react-native";
import { Chip, useTheme } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const TagsForm = () => {
  const theme = useTheme();
  const { showToast } = useToast();

  const { setValue, getValues } =
    useFormContext<InferType<typeof recipeSchema>>();

  const [tag, setTag] = useState("");
  const [_, setUpdateView] = useState(false);

  const addNewTag = (value: string) => {
    if (value.length < 3) {
      showToast({ message: "É necessário pelo menos 3 caracteres para tag" });
      return;
    }

    setTag("");
    setValue("tags", [...(getValues("tags") ?? []), value]);
  };

  const removeTag = (nameTag: string) => {
    const { tags } = getValues();

    const updatedTags = tags?.filter((s) => s !== nameTag);

    setValue("tags", updatedTags);
    setUpdateView((prevState) => !prevState);
  };

  return (
    <ContainerForm>
      <TitleForm
        title="Adicione algumas tags para identificar sua receita"
        subtitle="Palavras chave"
      />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 3 }}>
          <TextInput
            label="Tags"
            onChangeText={setTag}
            value={tag}
            maxLength={24}
          />
        </View>

        <Button
          style={{ flex: 2, marginTop: 24 }}
          onPress={() => addNewTag(tag)}
        >
          Adicionar
        </Button>
      </View>

      <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
        {getValues("tags")?.map((field) => (
          <Chip
            key={field}
            closeIcon={"close"}
            onClose={() => removeTag(field ?? "")}
            style={{ backgroundColor: theme.colors.surfaceVariant }}
          >
            {field}
          </Chip>
        ))}
      </View>
    </ContainerForm>
  );
};
