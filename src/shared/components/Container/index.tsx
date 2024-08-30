import { View } from "react-native";
import { useTheme } from "react-native-paper";

export const Container = (props: React.PropsWithChildren) => {
  const theme = useTheme();

  return (
    <View
      style={{ flex: 1, backgroundColor: theme.colors.onPrimary, padding: 8 }}
    >
      {props.children}
    </View>
  );
};
