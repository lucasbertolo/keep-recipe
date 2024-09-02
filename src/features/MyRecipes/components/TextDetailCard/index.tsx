import { If, Space, Typography } from "@/shared/components";
import { TextStyle } from "react-native";
import { Divider } from "react-native-paper";

type Props = {
  shouldHide?: boolean;
  text?: string;
  style?: TextStyle;
  variant?: "subtitle" | "body" | "caption";
};

export const TextDetailCard = ({ text, style, shouldHide, variant }: Props) => {
  if (shouldHide) return null;

  return (
    <>
      <Typography style={style} variant={variant}>
        {text}
      </Typography>
    </>
  );
};
