import { TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const IngredientsForm = () => {
  const theme = useTheme();

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
        <Typography variant="caption" style={{ color: theme.colors.tertiary }}>
          Toque aqui para adicionar um novo ingrediente
        </Typography>
      </TouchableOpacity>

      {fields.map((item, index) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.containerName}>
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

          <View style={styles.containerQuantity}>
            <Controller
              control={control}
              name={`ingredients.${index}.quantity`}
              defaultValue={item.quantity}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Qtde"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors?.ingredients?.[index]?.quantity}
                />
              )}
            />
          </View>

          <TouchableOpacity
            onPress={() => remove(index)}
            style={styles.containerButton}
          >
            <IconButton icon="trash-can-outline" size={18} />
          </TouchableOpacity>
        </View>
      ))}
    </ContainerForm>
  );
};

const styles = StyleSheet.create({
  containerName: {
    flex: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerQuantity: {
    flex: 2,
    marginLeft: 6,
  },
  containerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
