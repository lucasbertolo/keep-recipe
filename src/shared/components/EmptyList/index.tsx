import { EmptyListSvg } from "@/shared/assets/images/svg";
import { Dimensions, StyleSheet, View } from "react-native";
import { Typography } from "../Typography";
import { Space } from "../Space";

type Props = {
  label: string;
  paddingParent?: number;
};

export const EmptyList = ({ label, paddingParent }: Props) => {
  return (
    <View
      style={[
        styles.container,
        { width: Dimensions.get("window").width - (paddingParent ?? 24) },
      ]}
    >
      <EmptyListSvg />
      <Space type="lg" />
      <Typography>{label}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
