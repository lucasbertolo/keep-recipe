import {
  CarouselPhotos,
  ListChips,
  Space,
  Typography,
} from "@/shared/components";
import { CategoryDictionary, DifficultyDictionary } from "@/shared/enums";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, IconButton, useTheme } from "react-native-paper";
import {
  IngredientDetails,
  StepDetails,
  TextDetailCard,
  TimeDetails,
} from "../../components";

type DetailsRecipeProps = {
  recipe: Recipes.Recipe;
};

export const DetailsRecipe = ({}: DetailsRecipeProps) => {
  const theme = useTheme();
  const router = useRouter();

  const recipe: Recipes.Recipe = {
    userId: "user123",
    title: "Vegan Chocolate Cake",
    description:
      "A delicious and moist vegan chocolate cake that's easy to make.",
    photos: ["https://picsum.photos/200/300", "https://picsum.photos/200/300"],
    createdAt: new Date("2024-08-28T12:00:00Z"),
    averageMoneySpent: 15.99,
    tags: ["dessert", "chocolate", "vegan"],
    steps: [
      "Preheat the oven to 350°F (175°C).",
      "Mix the dry ingredients together in a bowl.",
      "Add the wet ingredients and mix until smooth.",
      "Pour the batter into a greased baking pan.",
      "Bake for 30-35 minutes or until a toothpick comes out clean.",
      "Let the cake cool before serving.",
    ],
    category: "dessert",
    isVegan: true,
    isVegetarian: true,
    isGlutenFree: false,
    isDairyFree: true,
    ingredients: [
      { name: "Flour", quantity: "2 cups" },
      { name: "Cocoa Powder", quantity: "1/2 cup" },
      { name: "Baking Powder", quantity: "1 tsp" },
      { name: "Sugar", quantity: "1 cup" },
      { name: "Vegetable Oil", quantity: "1/2 cup" },
      { name: "Vanilla Extract", quantity: "1 tsp" },
      { name: "Soy Milk", quantity: "1 cup" },
    ],
    prepTime: 15,
    cookTime: 35,
    totalTime: 50,
    servings: 8,
    difficulty: "medium",
    source: "Grandma's Recipe Book",
    rating: 4.8,
    observation: "For best results, use high-quality cocoa powder.",
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={24}
          iconColor={theme.colors.primary}
          style={{ backgroundColor: theme.colors.onPrimary }}
          onPress={() => router.back()}
        />
      </View>

      <CarouselPhotos photos={recipe.photos ?? []} />

      <View style={{ padding: 16 }}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Typography variant="subtitle">{recipe.title}</Typography>

          <TextDetailCard
            variant="caption"
            style={{ color: theme.colors.secondary }}
            text={CategoryDictionary[recipe.category!]}
            shouldHide={!recipe.category}
          />
        </View>

        <Divider />

        <Space />

        <TextDetailCard
          text={recipe.description}
          shouldHide={!recipe.description}
        />

        <Space type="lg" />

        <TextDetailCard
          text={`Dificuldade: ${DifficultyDictionary[recipe.difficulty!]}`}
          shouldHide={!recipe.difficulty}
        />
        <TextDetailCard
          text={`Serve: ${recipe.servings} porções`}
          shouldHide={!recipe.difficulty}
        />
        <Space type="md" />
        <ListChips chips={recipe.tags ?? []} />
        <Space type="md" />
        <TimeDetails recipe={recipe} />
        <Space type="md" />
        <Divider />
        <Space type="md" />
        <IngredientDetails recipe={recipe} />
        <Divider />
        <Space type="md" />
        <StepDetails recipe={recipe} />
        <Divider />
        <Space />
        <TextDetailCard
          text={`Observação: ${recipe.observation}`}
          shouldHide={!recipe.observation}
        />
        <Space />
        <TextDetailCard
          text={`Nota: ${recipe.rating}`}
          shouldHide={!recipe.rating}
        />
        <TextDetailCard
          text={`Data de criação: ${new Date(recipe.createdAt ?? new Date()).toLocaleDateString()}`}
          shouldHide={!recipe.createdAt}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 20,
    right: 0,
    left: 0,
    padding: 8,
    zIndex: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 6,
  },
});
