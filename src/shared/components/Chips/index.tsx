import { View } from "react-native";
import { Chip } from "react-native-paper";

type ListChipsProps = {
  onRemove?: (e: string) => void;
  chips: string[];
};

export const ListChips = ({ onRemove, chips }: ListChipsProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 12,
        flexWrap: "wrap",
        padding: 12,
      }}
    >
      {chips.map((field) => (
        <Chip key={field} closeIcon={"close"} onClose={() => onRemove?.(field)}>
          {field}
        </Chip>
      ))}
    </View>
  );
};
