import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

type Props = {
  options: string[];
  onSelectionChange: (e: string[]) => void;
  value: string[];
};

export const MultiselectChip = ({
  options,
  onSelectionChange,
  value,
}: Props) => {
  const handleChipPress = (chip: string) => {
    const isSelected = value.includes(chip);

    const updatedChips = isSelected
      ? value.filter((item) => item !== chip)
      : [...value, chip];

    onSelectionChange(updatedChips);
  };

  return (
    <View style={styles.chipContainer}>
      {options.map((chip) => (
        <Chip
          key={chip}
          style={styles.chip}
          selected={value.includes(chip)}
          onPress={() => handleChipPress(chip)}
        >
          {chip}
        </Chip>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 10,
  },
  chip: {
    margin: 4,
    backgroundColor: "lightgray",
  },
});
