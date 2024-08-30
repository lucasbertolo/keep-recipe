import React, { memo } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

const WrapperForm = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.background, { backgroundColor: theme.colors.background }]}
    >
      <KeyboardAvoidingView style={[styles.container]} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(WrapperForm);
