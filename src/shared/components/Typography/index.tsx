import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "react-native-paper";

interface TypographyProps {
  variant?: "heading" | "subtitle" | "body" | "caption";
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  style,
  children,
}) => {
  const theme = useTheme();

  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case "heading":
        return styles.heading;
      case "subtitle":
        return styles.subtitle;
      case "caption":
        return styles.caption;
      case "body":
      default:
        return styles.body;
    }
  };

  return (
    <Text style={[getVariantStyle(), { color: theme.colors.shadow }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "Suse",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    fontFamily: "Suse",
  },
  body: {
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 22,
    fontFamily: "Suse",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    fontFamily: "Suse",
  },
});
