import { MoonSvg, SunSvg } from "@/shared/assets/images/svg";
import { Typography } from "@/shared/components";
import { useLocalTheme } from "@/shared/hooks";
import { StyleSheet, View } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";

export const ThemeInput = () => {
  const theme = useTheme();
  const { toggleTheme, colorScheme } = useLocalTheme();

  return (
    <View>
      <RadioButton.Group
        onValueChange={(e) => toggleTheme(e as "dark" | "light")}
        value={colorScheme as string}
      >
        <View style={styles.row}>
          <SunSvg width={24} height={24} fill={theme.colors.primary} />
          <View style={{ flex: 1 }}>
            <RadioButton.Item
              value="light"
              label="Modo claro"
              status={colorScheme === "light" ? "checked" : "unchecked"}
            />
          </View>
        </View>

        <View style={styles.row}>
          <MoonSvg
            width={18}
            height={18}
            style={{ marginLeft: 3 }}
            fill={theme.colors.primary}
          />
          <View style={{ flex: 1 }}>
            <RadioButton.Item
              value="dark"
              label="Modo escuro"
              status={colorScheme === "dark" ? "checked" : "unchecked"}
            />
          </View>
        </View>
      </RadioButton.Group>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
});
