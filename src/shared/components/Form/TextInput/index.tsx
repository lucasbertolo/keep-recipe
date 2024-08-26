import React, { memo } from "react";
import { Text, View } from "react-native";
import { TextInput as Input, useTheme } from "react-native-paper";

export type TextInputProps = React.ComponentProps<typeof Input> & {
  errorText?: string;
};

const TextInput = ({ errorText, ...props }: TextInputProps) => {
  const theme = useTheme();
  return (
    <View style={{ width: "100%", marginVertical: 12 }}>
      <Input
        {...props}
        style={{ backgroundColor: theme.colors.onBackground }}
        selectionColor={theme.colors.background}
        underlineColor="transparent"
        mode="outlined"
      />

      {errorText ? (
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.error,
            paddingHorizontal: 4,
            paddingTop: 4,
          }}
        >
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

export default memo(TextInput);
