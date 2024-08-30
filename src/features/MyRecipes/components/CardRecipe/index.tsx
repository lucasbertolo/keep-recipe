import { CarouselPhotos, If, Typography } from "@/shared/components";
import { Shadows } from "@/shared/constants/Shadows";
import { useState } from "react";
import { View } from "react-native";
import { Card, useTheme } from "react-native-paper";

type CardRecipeProps = {
  recipe: Recipes.Recipe;
};

export const CardRecipe = ({ recipe }: CardRecipeProps) => {
  const theme = useTheme();

  const [cardWidth, setCardWidth] = useState(0);

  return (
    <Card
      style={{
        width: "90%",
        alignSelf: "center",
        backgroundColor: theme.colors.background,
        borderRadius: 12,
        ...Shadows.light,
      }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;

        setCardWidth(width);
      }}
    >
      <If condition={!!cardWidth}>
        <CarouselPhotos
          width={cardWidth}
          containerStyle={{ borderTopRightRadius: 12, borderTopLeftRadius: 12 }}
          photos={[
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
          ]}
        />
      </If>

      <View style={{ padding: 12 }}>
        <Typography>{recipe.title}</Typography>
        <Typography>{recipe.totalTime}</Typography>
        <Typography>{recipe.category}</Typography>
      </View>
    </Card>
  );
};
