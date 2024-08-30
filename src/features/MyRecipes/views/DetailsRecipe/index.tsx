import { CarouselPhotos, ListChips, Typography } from "@/shared/components";
import { ScrollView, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

type DetailsRecipeProps = {
  recipe: Recipes.Recipe;
};

export const DetailsRecipe = ({ recipe }: DetailsRecipeProps) => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <IconButton icon="chevron-left" size={12} background="#FFF" />
      </View>
      <CarouselPhotos photos={recipe.photos ?? []} />

      <Typography>{recipe.title}</Typography>

      <Typography>{recipe.description}</Typography>

      <Typography>Tempo forno: {recipe.cookTime}</Typography>
      <Typography>Tempo de preparo: {recipe.prepTime}</Typography>
      <Typography>Tempo total: {recipe.totalTime}</Typography>

      <ListChips chips={recipe.tags ?? []} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 30,
  },
  row: {
    flexDirection: "row",
  },
});
