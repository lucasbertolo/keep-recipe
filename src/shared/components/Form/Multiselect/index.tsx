import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Checkbox,
  IconButton,
  Modal,
  Portal,
  useTheme,
} from "react-native-paper";

interface MultiSelectProps {
  options: { label: string; value: string }[];
  selectedValues: string[];
  onValueChange: (selected: string[]) => void;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onValueChange,
  placeholder = "Select items",
}) => {
  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible(!visible);

  const handleSelect = (value: string) => {
    let newSelectedValues = [...selectedValues];

    if (newSelectedValues.includes(value)) {
      newSelectedValues = newSelectedValues.filter((item) => item !== value);
    } else {
      newSelectedValues.push(value);
    }

    onValueChange(newSelectedValues);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.selectBox}>
        <Text style={styles.selectText}>
          {selectedValues.length > 0
            ? selectedValues
                .map(
                  (val) =>
                    options.find((option) => option.value === val)?.label,
                )
                .join(", ")
            : placeholder}
        </Text>
        <IconButton icon="chevron-down" size={20} />
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={toggleModal}
          contentContainerStyle={styles.modal}
        >
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handleSelect(option.value)}
                style={styles.option}
              >
                <Checkbox
                  status={
                    selectedValues.includes(option.value)
                      ? "checked"
                      : "unchecked"
                  }
                />
                <Text style={styles.optionLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    justifyContent: "space-between",
  },
  selectText: {
    flex: 1,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  optionLabel: {
    marginLeft: 8,
  },
});

export default MultiSelect;
