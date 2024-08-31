import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
import { useTheme } from "react-native-paper";

interface TypographyProps {
  variant?: "heading" | "subtitle" | "body" | "caption";
  fontType?: "light" | "regular" | "bold" | "semibold" | "medium";
  style?: TextStyle | TextStyle[];
  color?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  style,
  fontType = "regular",
  children,
  color,
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

  const getFontFamily = (): string => {
    switch (fontType) {
      case "light":
        return "Suse";
      case "semibold":
        return "SuseSemiBold";
      case "medium":
        return "SuseMedium";
      case "bold":
        return "SuseBold";
      case "regular":
      default:
        return "SuseRegular";
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        { color: color ?? theme.colors.shadow, fontFamily: getFontFamily() },
        style,
      ]}
    >
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
    fontSize: 14,
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
