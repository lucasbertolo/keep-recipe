import { useState, useEffect, useCallback } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "../constants/StoreKeys";

export const useLocalTheme = () => {
  const router = useRouter();
  const { colorScheme: globalColorScheme } = useGlobalSearchParams();
  const [localColorScheme, setLocalColorScheme] = useState(
    globalColorScheme || "dark",
  );

  const getInitialLocalScheme = useCallback(async () => {
    const value = await AsyncStorage.getItem(StorageKeys.theme);

    if (value && value !== localColorScheme) {
      setLocalColorScheme(value);
    }
  }, []);

  useEffect(() => {
    getInitialLocalScheme();
  }, [getInitialLocalScheme]);

  useEffect(() => {
    if (globalColorScheme && globalColorScheme !== localColorScheme) {
      setLocalColorScheme(globalColorScheme);
    }
  }, [globalColorScheme]);

  const toggleTheme = async (newTheme: "dark" | "light") => {
    setLocalColorScheme(newTheme);

    await AsyncStorage.setItem(StorageKeys.theme, newTheme);

    router.setParams({ colorScheme: newTheme });
  };

  return { toggleTheme, colorScheme: localColorScheme };
};
