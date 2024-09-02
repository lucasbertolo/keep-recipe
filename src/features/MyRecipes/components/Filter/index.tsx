import {
  Button,
  Checkbox,
  MultiselectChip,
  Space,
  TextInput,
} from "@/shared/components";
import { CategoryDictionary, DifficultyDictionary } from "@/shared/enums";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";

type FilterProps = {
  defaultFilters: Recipes.Filters;
  filters: Recipes.Filters;
  setFilters: (e: Recipes.Filters) => void;
};

export const Filter = ({
  filters,
  setFilters,
  defaultFilters,
}: FilterProps) => {
  const { close } = useBottomSheet();

  // const { data: tags } = useGetTags();

  const { control, handleSubmit, reset } = useForm<Recipes.Filters>({
    defaultValues: {
      ...filters,
      difficulty: filters.difficulty
        ? filters.difficulty.map(
            (key) =>
              DifficultyDictionary[key as keyof typeof DifficultyDictionary],
          )
        : undefined,
      category: filters.category
        ? filters.category.map(
            (key) => CategoryDictionary[key as keyof typeof CategoryDictionary],
          )
        : undefined,
    },
  });

  // const onRemoveTag = (value: string[], field: string) => {
  //   const newTags = value.filter((tag) => tag !== field) ?? "";

  //   setValue("tags", newTags);
  // };

  const resetFilters = () => {
    reset(defaultFilters);
  };

  const getKey = (obj: object, key: string) => {
    return Object.keys(obj)[Object.values(obj).indexOf(key)];
  };

  const onSubmit: SubmitHandler<Recipes.Filters> = (data) => {
    const model = { ...data };

    if (data.category.length > 0) {
      model.category = model.category.map((item) =>
        getKey(CategoryDictionary, item),
      );
    }

    if (data.difficulty.length > 0) {
      model.difficulty = model.difficulty.map((item) =>
        getKey(DifficultyDictionary, item),
      );
    }

    setFilters(model);
    close();
  };

  return (
    <>
      {/* {!!tags?.length && (
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, value } }) => (
            <>
              <Lookup
                label="Tags"
                data={tags ?? []}
                onSelect={onChange}
                values={value}
              />

              <ListChips
                chips={value}
                onRemove={(e) => onRemoveTag(value, e)}
              />
            </>
          )}
        />
      )}
       */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="prepTime"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Máximo tempo de preparo"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value?.toString()}
                keyboardType="numeric"
              />
            )}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Controller
            control={control}
            name="servings"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label="Mínimo de Porções"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType="numeric"
                value={value?.toString()}
              />
            )}
          />
        </View>
      </View>
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <MultiselectChip
            options={[
              CategoryDictionary.dessert,
              CategoryDictionary.meal,
              CategoryDictionary.snack,
            ]}
            onSelectionChange={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="difficulty"
        render={({ field: { onChange, value } }) => (
          <MultiselectChip
            options={[
              DifficultyDictionary.easy,
              DifficultyDictionary.medium,
              DifficultyDictionary.hard,
            ]}
            onSelectionChange={onChange}
            value={value}
          />
        )}
      />

      <Space type="lg" />

      <Controller
        control={control}
        name="isVegan"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Vegana"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />
      <Controller
        control={control}
        name="isVegetarian"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Vegetariana"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />
      <Controller
        control={control}
        name="isGlutenFree"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Sem glúten"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />
      <Controller
        control={control}
        name="isDairyFree"
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Sem laticínio"
            checked={!!value}
            onPress={() => onChange(!value)}
          />
        )}
      />

      <Button mode="outlined" onPress={resetFilters}>
        Limpar
      </Button>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Salvar
      </Button>
    </>
  );
};
