import { ApronSvg, ClockSvg, OvenSvg } from "@/shared/assets/images/svg";
import { If, Typography } from "@/shared/components";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  recipe?: Recipes.Recipe;
};

export const TimeDetails = ({ recipe }: Props) => {
  return (
    <View style={{ flex: 1, alignItems: "flex-start", marginVertical: 12 }}>
      <If condition={!!recipe?.cookTime} style={styles.row}>
        <View style={{ width: "10%" }}>
          <OvenSvg width={20} height={20} />
        </View>
        <View>
          <Typography>{recipe?.cookTime} min</Typography>
        </View>
      </If>

      <If condition={!!recipe?.prepTime} style={styles.row}>
        <View style={{ width: "10%" }}>
          <ApronSvg width={20} height={20} />
        </View>
        <View>
          <Typography>{recipe?.prepTime} min</Typography>
        </View>
      </If>

      <If condition={!!recipe?.totalTime} style={styles.row}>
        <View style={{ width: "10%" }}>
          <ClockSvg width={20} height={20} />
        </View>
        <View style={{ flex: 5 }}>
          <Typography>{recipe?.totalTime} min</Typography>
        </View>
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 6,
  },
});
