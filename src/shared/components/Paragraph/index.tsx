import React, { memo } from "react";
import { Text } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

const Paragraph = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <Text
      style={{
        fontSize: 16,
        lineHeight: 26,
        color: theme.colors.secondary,
        textAlign: "center",
        marginBottom: 14,
      }}
    >
      {children}
    </Text>
  );
};

export default memo(Paragraph);
