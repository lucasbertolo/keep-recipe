import {
  FirebaseCrashlyticsService,
  FirebaseFirestoreService,
} from "@/config/services";
import {
  BottomSheet,
  CarouselPhotos,
  If,
  ListChips,
  Space,
  Typography,
} from "@/shared/components";
import { CategoryDictionary, DifficultyDictionary } from "@/shared/enums";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, useTheme } from "react-native-paper";
import {
  IngredientDetails,
  MenuDetail,
  SectionDetails,
  StepDetails,
  TextDetailCard,
  TimeDetails,
} from "../../components";
import { useMyRecipes } from "../../provider";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export const DetailsRecipe = () => {
  const menuModalRef = useRef<BottomSheetModal>(null);

  const theme = useTheme();
  const router = useRouter();
  const { selectedRecipe: recipe } = useMyRecipes();

  useEffect(() => {
    FirebaseCrashlyticsService.crash();
  });

  const created = useMemo(() => {
    const { date } = FirebaseFirestoreService.getDate(recipe?.createdAt ?? {});

    if (!date) return;
    return new Date(date).toLocaleDateString("pt-BR");
  }, [recipe?.createdAt]);

  const goToSource = () => {
    if (!recipe?.source) return;

    Linking.openURL(recipe.source);
  };

  const handleDisplayMenu = (): void => {
    if (menuModalRef?.current) menuModalRef.current.present();
  };

  const shouldShowHealthDetails =
    !!recipe?.isDairyFree ||
    !!recipe?.isGlutenFree ||
    !!recipe?.isVegan ||
    !!recipe?.isVegetarian;

  const shouldShowGeneralDetails =
    !!recipe?.observation ||
    !!recipe?.rating ||
    !!recipe?.source ||
    !!recipe?.createdAt;

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

        <IconButton
          icon="dots-horizontal"
          size={24}
          iconColor={theme.colors.primary}
          style={{ backgroundColor: theme.colors.onPrimary }}
          onPress={handleDisplayMenu}
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

        <SectionDetails condition={!!recipe?.description}>
          <TextDetailCard
            text={recipe?.description}
            shouldHide={!recipe?.description}
          />
        </SectionDetails>

        <SectionDetails condition={shouldShowHealthDetails} hasDivider>
          <>
            <TextDetailCard
              variant="caption"
              text={recipe?.isDairyFree ? "Sem latícinios" : ""}
              shouldHide={!recipe?.isDairyFree}
              style={{ color: theme.colors.outline }}
            />
            <TextDetailCard
              variant="caption"
              text={recipe?.isVegan ? "Vegano" : ""}
              shouldHide={!recipe?.isVegan}
              style={{ color: theme.colors.outline }}
            />
            <TextDetailCard
              variant="caption"
              text={recipe?.isVegetarian ? "Vegetariano" : ""}
              shouldHide={!recipe?.isVegetarian}
              style={{ color: theme.colors.outline }}
            />
            <TextDetailCard
              variant="caption"
              text={recipe?.isGlutenFree ? "Sem gluten" : ""}
              shouldHide={!recipe?.isGlutenFree}
              style={{ color: theme.colors.outline }}
            />
          </>
        </SectionDetails>

        <SectionDetails
          condition={!!recipe?.difficulty?.length || !!recipe?.servings}
          hasDivider
        >
          <>
            <TextDetailCard
              text={`Dificuldade: ${DifficultyDictionary[recipe?.difficulty!]}`}
              shouldHide={!recipe?.difficulty}
            />
            <TextDetailCard
              text={`Serve: ${recipe?.servings} porções`}
              shouldHide={!recipe?.servings}
            />
          </>
        </SectionDetails>

        <ListChips chips={recipe?.tags ?? []} />

        <TimeDetails recipe={recipe} />

        <IngredientDetails recipe={recipe} />

        <StepDetails recipe={recipe} />

        <SectionDetails condition={shouldShowGeneralDetails}>
          <>
            <TextDetailCard
              text={`Observação: ${recipe?.observation}`}
              shouldHide={!recipe?.observation}
            />
            <TextDetailCard
              text={`Nota: ${recipe?.rating}`}
              shouldHide={!recipe?.rating}
            />
            <If
              condition={!!recipe?.source}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <Typography>Fonte: </Typography>
              <TouchableOpacity onPress={goToSource}>
                <Typography color={theme.colors.primary}>
                  {recipe?.source}
                </Typography>
              </TouchableOpacity>
            </If>
            <TextDetailCard
              text={`Data de criação: ${created}`}
              shouldHide={!recipe?.createdAt?.seconds}
            />
          </>
        </SectionDetails>
      </View>

      <BottomSheet
        bottomSheetModalRef={menuModalRef}
        defaultSnapPoints={["35%", "40%", "50%"]}
      >
        <MenuDetail />
      </BottomSheet>
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 6,
  },
});
