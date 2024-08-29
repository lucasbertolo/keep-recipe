import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Text, useTheme, IconButton } from "react-native-paper";

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
            borderColor: theme.colors.onSurface,
          },
        ]}
      >
        {checked && <IconButton icon="check" size={16} iconColor="#FFF" />}
      </View>
      <Text style={styles.label}>{label}</Text>
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
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
