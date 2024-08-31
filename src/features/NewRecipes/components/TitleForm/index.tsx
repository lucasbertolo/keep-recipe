import { If, Space, Typography } from "@/shared/components";
import { useTheme } from "react-native-paper";

type Props = {
  title: string;
  subtitle?: string;
};

export const TitleForm = ({ title, subtitle }: Props) => {
  const theme = useTheme();

  return (
    <>
      <If condition={!!subtitle}>
        <Typography variant="caption" style={{ color: theme.colors.primary }}>
          {subtitle}
        </Typography>
        <Space type="sm" />
      </If>

      <Typography variant="subtitle">{title}</Typography>
      <Space type="lg" />
    </>
  );
};
