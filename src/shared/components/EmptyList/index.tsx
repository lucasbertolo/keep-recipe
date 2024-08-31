import { EmptyListSvg } from "@/shared/assets/images/svg";
import { Dimensions, View } from "react-native";
import { Typography } from "../Typography";
import { Space } from "../Space";

type Props = {
  label: string;
  paddingParent?: number;
};

export const EmptyList = ({ label, paddingParent }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        width: Dimensions.get("window").width - (paddingParent ?? 24),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <EmptyListSvg />
      <Space type="lg" />
      <Typography>{label}</Typography>
    </View>
  );
};
