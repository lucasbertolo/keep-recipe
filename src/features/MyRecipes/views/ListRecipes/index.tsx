import { SearchBar, Typography } from "@/shared/components";
import { useSearchBar } from "@/shared/hooks";
import { useCallback, useMemo } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  View,
} from "react-native";
import { CardRecipe, Filter } from "../../components";
import { useGetRecipes } from "../../queries";
import { useRouter } from "expo-router";

const searchParams: (keyof Recipes.Recipe)[] = [
  "title",
  "ingredients",
  "tags",
  "createdAt",
];

export const ListRecipes = () => {
  const router = useRouter();
  const { search, filterBySearchBar, handleSearch } =
    useSearchBar<Recipes.Recipe>(searchParams);

  const { data: recipes, isLoading, isRefetching } = useGetRecipes();

  const navigateToDetails = () => {
    router.navigate("/(auth)/details-recipe");
  };

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Recipes.Recipe>) => {
      return (
        <TouchableOpacity onPress={navigateToDetails}>
          <CardRecipe recipe={item} />
        </TouchableOpacity>
      );
    },
    [],
  );

  const filteredRecipes = useMemo(() => {
    return filterBySearchBar(recipes ?? []);
  }, [recipes, filterBySearchBar]);

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        onChangeText={handleSearch}
        value={search}
        filterChildren={<Filter />}
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
      />
    </View>
  );
};
