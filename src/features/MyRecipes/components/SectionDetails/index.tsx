import { If, Space } from "@/shared/components";
import { View } from "react-native";
import { Divider } from "react-native-paper";

type SectionDetailsProps = {
  condition: boolean;
  hasDivider?: boolean;
  children: React.ReactElement;
};

export const SectionDetails = ({
  condition,
  children,
  hasDivider,
}: SectionDetailsProps) => {
  if (!condition) return null;

  return (
    <View style={{ marginBottom: 12 }}>
      {children}
      <If condition={!!hasDivider}>
        <Space />
        <Divider />
      </If>
    </View>
  );
};
