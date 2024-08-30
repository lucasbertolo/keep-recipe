import { Space, TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";

export const StepsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "steps",
  });

  const addNewStep = () => {
    const index = !!fields[0]?.description ? fields.length + 1 : 0;

    append({ description: "", index });
  };

  return (
    <ContainerForm>
      <Typography>Descreva os passos realizados</Typography>
      <Space />

      <TouchableOpacity onPress={addNewStep}>
        <Typography variant="caption" style={{ color: "blue" }}>
          Toque aqui para adicionar um novo passo
        </Typography>
      </TouchableOpacity>

      {fields.map((item, index) => (
        <View
          key={item.id}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <View style={{ flex: 3 }}>
            <Controller
              control={control}
              name={`steps.${index}.description`}
              defaultValue={item.description || ""}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={`Passo ${index + 1}`}
                  placeholder={`Passo ${index + 1}`}
                  onBlur={onBlur}
                  multiline
                  onChangeText={onChange}
                  value={value}
                  numberOfLines={5}
                  maxLength={500}
                  error={!!errors?.steps?.[index]}
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
