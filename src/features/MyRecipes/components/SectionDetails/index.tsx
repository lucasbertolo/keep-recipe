import { If, Space } from "@/shared/components";
import { StyleSheet, View } from "react-native";
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
    <View style={styles.container}>
      {children}
      <If condition={!!hasDivider}>
        <Space />
        <Divider />
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
});
