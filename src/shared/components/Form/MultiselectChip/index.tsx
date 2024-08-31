import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Icon, IconButton, useTheme } from "react-native-paper";

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
  const theme = useTheme();

  const handleChipPress = (chip: string) => {
    const isSelected = value.includes(chip);

    const updatedChips = isSelected
      ? value.filter((item) => item !== chip)
      : [...value, chip];

    onSelectionChange(updatedChips);
  };

  return (
    <View style={styles.chipContainer}>
      {options.map((chip) => {
        const isSelected = value.includes(chip);
        const textColor = isSelected
          ? theme.colors.onPrimary
          : theme.colors.onSurfaceVariant;
        const backgroundColor = isSelected
          ? theme.colors.primary
          : theme.colors.surfaceVariant;

        const icon = () =>
          isSelected ? (
            <Icon source="check" size={10} color={textColor} />
          ) : undefined;

        return (
          <Chip
            key={chip}
            style={[{ backgroundColor }, styles.chip]}
            textStyle={{ color: textColor }}
            selected={isSelected}
            icon={icon}
            onPress={() => handleChipPress(chip)}
          >
            {chip}
          </Chip>
        );
      })}
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
  },
});
