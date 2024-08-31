import { ApronSvg, ClockSvg, OvenSvg } from "@/shared/assets/images/svg";
import { If, Typography } from "@/shared/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Tooltip } from "react-native-paper";

type Props = {
  recipe?: Recipes.Recipe;
};

export const TimeDetails = ({ recipe }: Props) => {
  if (!recipe?.cookTime && !recipe?.totalTime && !recipe?.prepTime) return null;

  return (
    <View style={{ flex: 1, alignItems: "flex-start", marginVertical: 12 }}>
      <If condition={!!recipe?.cookTime} style={styles.row}>
        <View style={{ width: "10%" }}>
          <Tooltip title="Tempo no forno" enterTouchDelay={100}>
            <OvenSvg width={20} height={20} />
          </Tooltip>
        </View>
        <View>
          <Typography>{recipe?.cookTime} m</Typography>
        </View>
      </If>

      <If condition={!!recipe?.prepTime} style={styles.row}>
        <View style={{ width: "10%" }}>
          <Tooltip title="Tempo de preparo" enterTouchDelay={100}>
            <ApronSvg width={20} height={20} />
          </Tooltip>
        </View>
        <View>
          <Typography>{recipe?.prepTime} m</Typography>
        </View>
      </If>

      <If condition={!!recipe?.totalTime} style={styles.row}>
        <View style={{ width: "10%" }}>
          <Tooltip title="Tempo total" enterTouchDelay={100}>
            <ClockSvg width={20} height={20} />
          </Tooltip>
        </View>
        <View style={{ flex: 5 }}>
          <Typography>{recipe?.totalTime} m</Typography>
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
