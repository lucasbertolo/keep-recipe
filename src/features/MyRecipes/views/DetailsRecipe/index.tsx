import {
  CarouselPhotos,
  ListChips,
  Space,
  Typography,
} from "@/shared/components";
import { CategoryDictionary, DifficultyDictionary } from "@/shared/enums";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider, IconButton, useTheme } from "react-native-paper";
import {
  IngredientDetails,
  StepDetails,
  TextDetailCard,
  TimeDetails,
} from "../../components";
import { useMyRecipes } from "../../provider";
import { FirebaseFirestoreService } from "@/config/services";

export const DetailsRecipe = () => {
  const theme = useTheme();
  const router = useRouter();
  const { selectedRecipe: recipe } = useMyRecipes();

  const created = useMemo(() => {
    const { date } = FirebaseFirestoreService.getDate(recipe?.createdAt ?? {});

    if (!date) return;
    return new Date(date).toLocaleDateString("pt-BR");
  }, [recipe?.createdAt]);

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

      <CarouselPhotos photos={recipe?.photos ?? []} />

      <View style={{ padding: 16 }}>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ flex: 1 }}>
            <Typography variant="subtitle" fontType="medium">
              {recipe?.title}
            </Typography>
          </View>

          <TextDetailCard
            variant="caption"
            style={{ color: theme.colors.secondary }}
            text={CategoryDictionary[recipe?.category!]}
            shouldHide={!recipe?.category}
          />
        </View>
        <Space type="sm" />
        <Divider />
        <Space type="sm" />
        <TextDetailCard
          text={recipe?.description}
          shouldHide={!recipe?.description}
          hasMarginBottom
        />

        <TextDetailCard
          variant="caption"
          text={recipe?.isDairyFree ? "Sem latícinios" : ""}
          shouldHide={!recipe?.isDairyFree}
          style={{ color: theme.colors.outline }}
        />
        <TextDetailCard
          variant="caption"
          text={recipe?.isVegan ? "Vegano" : ""}
          shouldHide={!recipe?.isDairyFree}
          style={{ color: theme.colors.outline }}
        />
        <TextDetailCard
          variant="caption"
          text={recipe?.isVegetarian ? "Vegetariano" : ""}
          shouldHide={!recipe?.isDairyFree}
          style={{ color: theme.colors.outline }}
        />
        <TextDetailCard
          variant="caption"
          text={recipe?.isGlutenFree ? "Sem gluten" : ""}
          shouldHide={!recipe?.isDairyFree}
          style={{ color: theme.colors.outline }}
        />

        <TextDetailCard
          text={`Dificuldade: ${DifficultyDictionary[recipe?.difficulty!]}`}
          shouldHide={!recipe?.difficulty}
        />
        <TextDetailCard
          text={`Serve: ${recipe?.servings} porções`}
          shouldHide={!recipe?.servings}
          hasMarginBottom
        />
        <ListChips chips={recipe?.tags ?? []} />
        <TimeDetails recipe={recipe} />
        <IngredientDetails recipe={recipe} />
        <StepDetails recipe={recipe} />
        <TextDetailCard
          text={`Observação: ${recipe?.observation}`}
          shouldHide={!recipe?.observation}
          hasMarginBottom
        />
        <TextDetailCard
          text={`Nota: ${recipe?.rating}`}
          shouldHide={!recipe?.rating}
        />
        <TextDetailCard
          text={`Data de criação: ${created}`}
          shouldHide={!recipe?.createdAt?.seconds}
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
