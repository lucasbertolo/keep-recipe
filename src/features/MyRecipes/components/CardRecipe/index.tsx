import { If, Typography } from "@/shared/components";
import { Shadows } from "@/shared/constants/Shadows";
import { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

type CardRecipeProps = {
  recipe: Recipes.Recipe;
};

export const CardRecipe = ({ recipe }: CardRecipeProps) => {
  const theme = useTheme();

  const coverPhoto = useMemo(() => {
    const photo = recipe?.photos?.[0];

    if (photo) return photo;

    return "";
  }, [recipe]);

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.background }]}>
      <Image style={styles.carousel} src={coverPhoto} />

      <View style={styles.details}>
        <Typography variant="body">{recipe.title}</Typography>

        <View style={styles.row}>
          <If condition={!!recipe.servings}>
            <Typography
              variant="caption"
              style={{ color: theme.colors.outline }}
            >
              {recipe.servings} porções
            </Typography>
          </If>

          <If condition={!!recipe.servings && !!recipe.totalTime}>
            <View style={styles.caption}>
              <Typography
                variant="caption"
                style={{ color: theme.colors.outline }}
              >
                -
              </Typography>
            </View>
          </If>

          <If condition={!!recipe.totalTime}>
            <Typography
              variant="caption"
              style={{ color: theme.colors.outline }}
            >
              {recipe.totalTime} min
            </Typography>
          </If>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    borderRadius: 12,
  },
  carousel: {
    borderRadius: 12,
    width: 240,
    height: 340,
    backgroundColor: "#FFF",
    ...Shadows.heavy,
  },
  details: {
    padding: 12,
  },
  caption: {
    marginHorizontal: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
});
