import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, useTheme, IconButton } from "react-native-paper";
import { Typography } from "../../Typography";

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  label: string;
}

export const Checkbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onPress,
  label,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.checkbox,
          {
            backgroundColor: checked ? theme.colors.primary : "transparent",
            borderColor: theme.colors.outline,
          },
        ]}
      >
        {checked && <IconButton icon="check" size={16} iconColor="#FFF" />}
      </View>
      <Typography variant="body">{label}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
