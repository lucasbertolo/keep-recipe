import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";

type Props = React.ComponentProps<typeof PaperButton> & {
  variant?: "ghost" | "normal";
};

const Button = ({ mode, style, children, variant, ...props }: Props) => {
  const theme = useTheme();

  const btnStyle =
    variant === "ghost"
      ? {
          backgroundColor: theme.colors.background,
          borderWidth: 1,
          borderColor: theme.colors.onBackground,
          ...styles.button,
        }
      : styles.button;
  const txtStyle =
    variant === "ghost"
      ? { color: theme.colors.onBackground, ...styles.text }
      : styles.text;

  return (
    <PaperButton
      style={[
        btnStyle,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={txtStyle}
      mode={mode}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 6,
  },
  text: {
    fontFamily: "Suse",
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
