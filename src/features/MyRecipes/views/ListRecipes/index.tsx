import { EmptyList, SearchBar, Typography } from "@/shared/components";
import { useSearchBar } from "@/shared/hooks";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from "react-native";
import { CardRecipe, Filter } from "../../components";
import { useGetRecipes } from "../../queries";
import { useRouter } from "expo-router";
import { useMyRecipes } from "../../provider";

const searchParams: (keyof Recipes.Recipe)[] = [
  "title",
  "ingredients",
  "tags",
  "createdAt",
];

export const ListRecipes = () => {
  const router = useRouter();
  const { selectRecipe } = useMyRecipes();
  const { search, filterBySearchBar, handleSearch } =
    useSearchBar<Recipes.Recipe>(searchParams);

  const { data: recipes, isLoading, isRefetching } = useGetRecipes();

  const [filters, setFilters] = useState<Recipes.Filters>({
    category: [] as string[],
    difficulty: [] as string[],
    isVegan: false,
    isVegetarian: false,
    isGlutenFree: false,
    isDairyFree: false,
    prepTime: 0,
    servings: 0,
    tags: [] as string[],
  });

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

  const emptyListMessage = useMemo(() => {
    return !!recipes?.length
      ? "Seu filtro não retornou resultados"
      : "Parece que você ainda não tem receitas";
  }, [recipes?.length]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        onChangeText={handleSearch}
        value={search}
        filterChildren={<Filter setFilters={setFilters} filters={filters} />}
      />

      <View style={{ paddingHorizontal: 18, marginBottom: 24 }}>
        <Typography variant="subtitle">Minhas receitas</Typography>
      </View>

      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 24, paddingHorizontal: 12 }}
        horizontal
        ListEmptyComponent={
          <EmptyList label={emptyListMessage} paddingParent={24} />
        }
      />
    </View>
  );
};
