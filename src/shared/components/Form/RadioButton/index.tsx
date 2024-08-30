import React, { useMemo } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Typography } from "../../Typography";

interface RadioButtonProps {
  selected: boolean;
  onPress: () => void;
  label: string;
  description?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  selected,
  onPress,
  label,
  description,
}) => {
  const theme = useTheme();

  const containerExtraStyle: StyleProp<ViewStyle> = useMemo(() => {
    if (selected) {
      const color = "rgba(0, 104, 116, 0.2)";
      return {
        backgroundColor: color,
        borderColor: color,
        borderWidth: 1,
      };
    }

    return {};
  }, [selected]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerExtraStyle]}
    >
      <View
        style={[
          styles.outerCircle,
          {
            borderColor: selected
              ? theme.colors.primary
              : theme.colors.onSurface,
          },
        ]}
      >
        {selected && (
          <View
            style={[
              styles.innerCircle,
              { backgroundColor: theme.colors.primary },
            ]}
          />
        )}
      </View>
      <View>
        <Typography variant="body">{label}</Typography>
        <Typography variant="caption">{description}</Typography>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    height: 80,
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FFF",
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  outerCircle: {
    width: 18,
    height: 18,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
