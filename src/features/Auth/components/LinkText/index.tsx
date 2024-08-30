import { Typography } from "@/shared/components";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";

type LinkTextProps = {
  action: () => void;
  text: string;
  textAction: string;
};

export const LinkText = ({ action, text, textAction }: LinkTextProps) => {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      <Typography style={{ color: theme.colors.secondary }}>{text}</Typography>

      <TouchableOpacity onPress={() => action()}>
        <Typography style={[styles.link, { color: theme.colors.primary }]}>
          {" "}
          {textAction}
        </Typography>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
  },
});
