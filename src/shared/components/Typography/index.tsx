import React, { memo } from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
};

const Typography = ({ children, style = {} as TextStyle }: Props) => {
  const theme = useTheme();

  return (
    <Text
      style={[
        {
          fontSize: 12,
          color: theme.colors.secondary,
          textAlign: "center",
          marginBottom: 14,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default memo(Typography);
