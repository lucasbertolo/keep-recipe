import { TextInput, Typography } from "@/shared/components";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";
import { ContainerForm } from "../ContainerForm";
import { TitleForm } from "../TitleForm";

export const StepsForm = () => {
  const theme = useTheme();
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
      <TitleForm title="Descreva os modo de preparo" subtitle="Passo a passo" />

      <TouchableOpacity onPress={addNewStep}>
        <Typography variant="caption" style={{ color: theme.colors.tertiary }}>
          Toque aqui para adicionar um novo passo
        </Typography>
      </TouchableOpacity>

      {fields.map((item, index) => (
        <View key={item.id} style={styles.row}>
          <View style={styles.columnInput}>
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
                  errorText={errors?.steps?.[index]?.message}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  columnInput: {
    flex: 3,
  },
  containerButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
