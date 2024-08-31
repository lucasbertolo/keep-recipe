import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton, useTheme } from "react-native-paper";

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, children, ...props }: Props) => {
  const theme = useTheme();

  const btnStyle = styles.button;
  const txtStyle = styles.text;

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
