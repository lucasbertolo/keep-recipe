import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Button, View } from "react-native";
import { TextInput } from "react-native-paper";
import { InferType } from "yup";
import { recipeSchema } from "../../validations";

export const IngredientsForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<InferType<typeof recipeSchema>>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <View>
      {fields.map((item, index) => (
        <View key={item.id}>
          <Controller
            control={control}
            name={`ingredients.${index}.name`}
            defaultValue={item.name || ""}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Ingredient Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors?.ingredients?.[index]?.name}
              />
            )}
          />

          <Controller
            control={control}
            name={`ingredients.${index}.quantity`}
            defaultValue={item.quantity}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Quantity"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors?.ingredients?.[index]?.quantity}
              />
            )}
          />
          <Button onPress={() => remove(index)} title="Remove Ingredient" />
        </View>
      ))}
      <Button
        onPress={() => append({ name: "", quantity: "" })}
        title="Add Ingredient"
      />
    </View>
  );
};
