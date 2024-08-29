import { TabBarIcon } from "@/shared/components/navigation/TabBarIcon";
import { Colors } from "@/shared/constants/Colors";
import { useLocalTheme } from "@/shared/hooks";
import { Tabs } from "expo-router";
import React from "react";
import { ColorSchemeName } from "react-native";

export default function TabLayout() {
  const { colorScheme } = useLocalTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          Colors[(colorScheme as ColorSchemeName) ?? "light"].onPrimary,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Configurações",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
