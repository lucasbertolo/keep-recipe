import React, { memo } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
  children: React.ReactNode;
};

const WrapperForm = ({ children }: Props) => {
  const theme = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.background,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <KeyboardAvoidingView style={[styles.container]} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    paddingVertical: 36,
  },
  container: {
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default memo(WrapperForm);
