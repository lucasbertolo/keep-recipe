import { FilterSvg } from "@/shared/assets/images/svg";
import { Shadows } from "@/shared/constants/Shadows";
import { TouchableOpacity, View } from "react-native";
import { Searchbar, TextInputProps, useTheme } from "react-native-paper";
import If from "../If";
import { useRef } from "react";
import { BottomSheet } from "../BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

type SearchBarProps = TextInputProps & {
  filterChildren?: JSX.Element;
};

export const SearchBar = ({
  value,
  onChangeText,
  filterChildren,
}: SearchBarProps) => {
  const theme = useTheme();

  const filterModalRef = useRef<BottomSheetModal>(null);

  const handleDisplayFilter = (): void => {
    if (filterModalRef?.current) filterModalRef.current.present();
  };

  return (
    <>
      <View style={{ padding: 24, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 4 }}>
          <Searchbar
            placeholder="Busque sua receita"
            onChangeText={onChangeText}
            value={value ?? ""}
            inputStyle={{ fontSize: 12 }}
            style={{
              backgroundColor: theme.colors.background,
              ...Shadows.light,
              borderRadius: 24,
            }}
          />
        </View>

        <If condition={!!filterChildren} style={{ flex: 1 }}>
          <TouchableOpacity onPress={handleDisplayFilter}>
            <FilterSvg height={24} />
          </TouchableOpacity>
        </If>
      </View>

      {!!filterChildren && (
        <BottomSheet
          defaultSnapPoints={["85%", "90%", "95%"]}
          bottomSheetModalRef={filterModalRef}
        >
          {filterChildren}
        </BottomSheet>
      )}
    </>
  );
};
