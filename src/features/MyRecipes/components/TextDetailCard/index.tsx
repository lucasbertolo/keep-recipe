import { If, Space, Typography } from "@/shared/components";
import { TextStyle } from "react-native";
import { Divider } from "react-native-paper";

type Props = {
  shouldHide?: boolean;
  text?: string;
  style?: TextStyle;
  variant?: "subtitle" | "body" | "caption";
  hasMarginBottom?: boolean;
  hasDivider?: boolean;
};

export const TextDetailCard = ({
  text,
  style,
  shouldHide,
  variant,
  hasDivider,
  hasMarginBottom,
}: Props) => {
  if (shouldHide) return null;

  return (
    <>
      <Typography style={style} variant={variant}>
        {text}
      </Typography>

      <If condition={!!hasMarginBottom}>
        <Space type="md" />
      </If>

      <If condition={!!hasDivider}>
        <Divider />
      </If>
    </>
  );
};
