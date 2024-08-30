import { SearchBar } from "@/shared/components";
import { useSearchBar } from "@/shared/hooks";
import { useCallback, useMemo } from "react";
import { FlatList, ListRenderItemInfo, View } from "react-native";
import { CardRecipe, Filter } from "../../components";
import { useGetRecipes } from "../../queries";

const searchParams: (keyof Recipes.Recipe)[] = [
  "title",
  "ingredients",
  "tags",
  "createdAt",
];

export const ListRecipes = () => {
  const { search, filterBySearchBar, handleSearch } =
    useSearchBar<Recipes.Recipe>(searchParams);

  const { data: recipes, isLoading, isRefetching } = useGetRecipes();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Recipes.Recipe>) => {
      return <CardRecipe recipe={item} />;
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

      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
};
