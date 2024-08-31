import { View } from "react-native";
import { Chip, useTheme } from "react-native-paper";

type ListChipsProps = {
  onRemove?: (e: string) => void;
  chips: string[];
};

export const ListChips = ({ onRemove, chips }: ListChipsProps) => {
  const theme = useTheme();

  if (!chips.length) return;

  return (
    <View
      style={{ flexDirection: "row", gap: 12, flexWrap: "wrap", padding: 12 }}
    >
      {chips.map((field) => (
        <Chip
          key={field}
          style={{
            backgroundColor: theme.colors.primary,
          }}
          textStyle={{ color: theme.colors.onPrimary }}
          closeIcon={!!onRemove ? "close" : undefined}
          onClose={!!onRemove ? () => onRemove(field) : undefined}
        >
          {field}
        </Chip>
      ))}
    </View>
  );
};
