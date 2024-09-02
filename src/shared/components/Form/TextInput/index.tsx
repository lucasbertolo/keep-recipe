import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput as Input, useTheme } from "react-native-paper";

export type TextInputProps = React.ComponentProps<typeof Input> & {
  errorText?: string;
};

const TextInput = ({ errorText, ...props }: TextInputProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Input
        {...props}
        style={{ backgroundColor: theme.colors.background }}
        selectionColor={theme.colors.onBackground}
        contentStyle={{ color: theme.colors.onBackground }}
      />

      {!!errorText && (
        <Text style={[styles.text, { color: theme.colors.error }]}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default memo(TextInput);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});
