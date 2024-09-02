import { FilterSvg } from "@/shared/assets/images/svg";
import { Shadows } from "@/shared/constants/Shadows";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
      <View style={styles.searchRow}>
        <View style={styles.searchCollumn}>
          <Searchbar
            placeholder="Busque sua receita"
            onChangeText={onChangeText}
            value={value ?? ""}
            inputStyle={styles.searchInput}
            style={[
              styles.searchContainer,
              {
                backgroundColor: theme.colors.background,
                shadowColor: theme.colors.inverseSurface,
              },
            ]}
          />
        </View>

        <If condition={!!filterChildren} style={styles.filterContainer}>
          <TouchableOpacity onPress={handleDisplayFilter}>
            <FilterSvg height={24} fill={theme.colors.onBackground} />
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

const styles = StyleSheet.create({
  searchRow: {
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  searchCollumn: {
    flex: 4,
  },
  searchInput: {
    fontSize: 12,
  },
  searchContainer: {
    borderRadius: 24,
    ...Shadows.light,
  },
  filterContainer: {
    flex: 1,
  },
});
