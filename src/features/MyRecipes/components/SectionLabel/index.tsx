import { Space, Typography } from "@/shared/components";

type SectionLabelProps = {
  label: string;
};

export const SectionLabel = ({ label }: SectionLabelProps) => {
  return (
    <>
      <Space />
      <Typography> {label}</Typography>
      <Space type="lg" />
    </>
  );
};
