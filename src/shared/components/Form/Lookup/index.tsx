import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { Typography } from "../../Typography";

type LookupProps = {
  label: string;
  data: string[];
  onSelect: (e: string[]) => void;
  values: string[];
};

export const Lookup = ({ data, label, onSelect, values }: LookupProps) => {
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (text: string) => {
    setQuery(text);

    if (!text) {
      setFilteredData([]);
      return;
    }

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredData(filtered);
  };

  const handleSelectItem = (item: string) => {
    setQuery("");
    setIsFocused(false);

    const hasEntry = values.includes(item);

    if (hasEntry) return;

    const updatedChips = [...values, item];

    onSelect(updatedChips);
  };

  const displayList = () => {
    if (!isFocused) setIsFocused(true);
  };

  const dataWithoutValues = useMemo(() => {
    return filteredData.filter((s) => !values.includes(s));
  }, [filteredData, values]);

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={label}
        value={query}
        onChangeText={handleInputChange}
        onFocus={displayList}
        onPress={displayList}
        onKeyPress={displayList}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
      />

      {isFocused && filteredData.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={dataWithoutValues}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectItem(item)}
                style={styles.listItem}
              >
                <Typography>{item}</Typography>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    position: "relative",
    zIndex: 1000,
  },
  input: {
    backgroundColor: "white",
    width: "100%",
  },
  listContainer: {
    position: "absolute",
    top: 56,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    maxHeight: 150,
    zIndex: 1000,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
