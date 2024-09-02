import { EmptyList, SearchBar, Typography } from "@/shared/components";
import { useSearchBar } from "@/shared/hooks";
import { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { CardRecipe, Filter } from "../../components";
import { useGetRecipes } from "../../queries";
import { useRouter } from "expo-router";
import { useMyRecipes } from "../../provider";
import { ActivityIndicator } from "react-native-paper";

const searchParams: (keyof Recipes.Recipe)[] = [
  "title",
  "ingredients",
  "tags",
  "createdAt",
];

const defaultFilters = {
  category: [] as string[],
  difficulty: [] as string[],
  isVegan: false,
  isVegetarian: false,
  isGlutenFree: false,
  isDairyFree: false,
  prepTime: 0,
  servings: 0,
  tags: [] as string[],
};

export const ListRecipes = () => {
  const router = useRouter();
  const { selectRecipe } = useMyRecipes();
  const { search, filterBySearchBar, handleSearch } =
    useSearchBar<Recipes.Recipe>(searchParams);

  const { data: recipes, isLoading, isRefetching } = useGetRecipes();

  const [filters, setFilters] = useState<Recipes.Filters>(defaultFilters);

  const navigateToDetails = (recipe: Recipes.Recipe) => {
    selectRecipe(recipe);
    router.navigate("/(auth)/details-recipe");
  };

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Recipes.Recipe>) => {
      return (
        <TouchableOpacity onPress={() => navigateToDetails(item)}>
          <CardRecipe recipe={item} />
        </TouchableOpacity>
      );
    },
    [],
  );

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [] as Recipes.Recipe[];

    let model = [...recipes];

    console.log("model", model);

    console.log("filters", filters);

    if (filters.category.length > 0) {
      model = model.filter((recipe) =>
        filters.category.includes(recipe.category ?? ""),
      );
    }

    if (filters.difficulty.length > 0) {
      model = model.filter((recipe) =>
        filters.difficulty.includes(recipe.difficulty ?? ""),
      );
    }

    if (filters.isVegan) {
      model = model.filter((recipe) => !!recipe.isVegan);
    }

    if (filters.isVegetarian) {
      model = model.filter((recipe) => !!recipe.isVegetarian);
    }

    if (filters.isGlutenFree) {
      model = model.filter((recipe) => !!recipe.isGlutenFree);
    }

    if (filters.isDairyFree) {
      model = model.filter((recipe) => !!recipe.isDairyFree);
    }

    if (filters.prepTime > 0) {
      model = model.filter(
        (recipe) => (recipe.prepTime ?? 0) <= filters.prepTime,
      );
    }

    if (filters.servings > 0) {
      model = model.filter(
        (recipe) => (recipe.servings ?? 0) >= filters.servings,
      );
    }

    if (filters.tags.length > 0) {
      model = model.filter((recipe) =>
        recipe.tags?.some((tag) => filters.tags.includes(tag)),
      );
    }

    return filterBySearchBar(model ?? []);
  }, [recipes, filterBySearchBar, filters]);

  const ListEmptyComponent = useCallback(() => {
    if (isLoading || isRefetching) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    const message = !!recipes?.length
      ? "Seu filtro não retornou resultados"
      : "Parece que você ainda não tem receitas";

    return <EmptyList label={message} paddingParent={24} />;
  }, [isLoading, recipes?.length, isRefetching]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        onChangeText={handleSearch}
        value={search}
        filterChildren={
          <Filter
            setFilters={setFilters}
            filters={filters}
            defaultFilters={defaultFilters}
          />
        }
      />

      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={styles.flatList}
        horizontal
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    width: Dimensions.get("window").width - 24,
    justifyContent: "center",
    alignItems: "center",
  },
  flatList: { gap: 24, paddingHorizontal: 12 },
  title: { paddingHorizontal: 18, marginBottom: 24 },
});
