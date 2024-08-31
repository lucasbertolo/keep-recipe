import {
  Button,
  Checkbox,
  ListChips,
  Lookup,
  MultiselectChip,
  TextInput,
} from "@/shared/components";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type FilterProps = {
  filters: Recipes.Filters;
  setFilters: (e: Recipes.Filters) => void;
};

export const Filter = ({ filters, setFilters }: FilterProps) => {
  const { close } = useBottomSheet();

  const { control, setValue, handleSubmit, reset } = useForm({
    defaultValues: { ...filters },
  });

  const onRemoveTag = (value: string[], field: string) => {
    const newTags = value.filter((tag) => tag !== field) ?? "";

    setValue("tags", newTags);
  };

  const resetFilters = () => {
    reset({});
  };

  const onSubmit: SubmitHandler<Recipes.Filters> = (data) => {
    console.log("ADSBUHSAD");
    setFilters(data);
    close();
  };

  return (
    <>
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
      <Controller
        control={control}
        name="category"
        render={({ field: { onChange, value } }) => (
          <MultiselectChip
            options={["dessert", "meal", "snack"]}
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
            options={["easy", "medium", "hard"]}
            onSelectionChange={onChange}
            value={value}
          />
        )}
      />

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

      <Controller
        control={control}
        name="tags"
        render={({ field: { onChange, value } }) => (
          <>
            <Lookup label="Tags" data={[]} onSelect={onChange} values={value} />

            <ListChips chips={value} onRemove={(e) => onRemoveTag(value, e)} />
          </>
        )}
      />

      <Button mode="outlined" onPress={resetFilters}>
        Apagar
      </Button>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Salvar
      </Button>
    </>
  );
};
