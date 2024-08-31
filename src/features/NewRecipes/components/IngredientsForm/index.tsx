import { TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const IngredientsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const addNewIngredient = () => {
    append({ name: "", quantity: "" });
  };

  return (
    <ContainerForm>
      <TitleForm
        title="Coloque os ingredientes utilizados"
        subtitle="Ingredientes"
      />

      <TouchableOpacity onPress={addNewIngredient}>
        <Typography variant="caption" style={{ color: "blue" }}>
          Toque aqui para adicionar um novo ingrediente
        </Typography>
      </TouchableOpacity>

      {fields.map((item, index) => (
        <View
          key={item.id}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ flex: 4 }}>
            <Controller
              control={control}
              name={`ingredients.${index}.name`}
              defaultValue={item.name || ""}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Nome"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={1}
                  error={!!errors?.ingredients?.[index]?.name}
                />
              )}
            />
          </View>

          <View style={{ flex: 2, marginLeft: 6 }}>
            <Controller
              control={control}
              name={`ingredients.${index}.quantity`}
              defaultValue={item.quantity}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Qtde"
                  onBlur={onBlur}
                  keyboardType="numeric"
                  onChangeText={onChange}
                  value={value}
                  error={!!errors?.ingredients?.[index]?.quantity}
                />
              )}
            />
          </View>

          <TouchableOpacity
            onPress={() => remove(index)}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <IconButton icon="trash-can-outline" size={18} />
          </TouchableOpacity>
        </View>
      ))}
    </ContainerForm>
  );
};
