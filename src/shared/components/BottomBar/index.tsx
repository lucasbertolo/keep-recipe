import { Shadows } from "@/shared/constants/Shadows";
import {
  CommonActions,
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import If from "../If";

type BottomTabDescriptor = any;
type BottomTabDescriptorMap = Record<string, BottomTabDescriptor>;
type BottomTabNavigationEventMap = {
  tabPress: { data: undefined; canPreventDefault: true };
  tabLongPress: { data: undefined };
};
type BottomTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  centerRoute: string;
};

export const BottomBar = ({
  state,
  navigation,
  descriptors,
  centerRoute,
}: BottomTabBarProps) => {
  const theme = useTheme();
  const centerIndex = state.routes.findIndex(
    (route) => route.name === centerRoute,
  );

  const onTabPress = (routeName: string) => {
    const event = navigation.emit({
      type: "tabPress",
      target: routeName,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      if (routeName === centerRoute) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName }],
          }),
        );

        return;
      }

      navigation.navigate(routeName);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          shadowColor: theme.colors.onSecondaryContainer,
        },
      ]}
    >
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          if (index === centerIndex) {
            return null;
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={() => onTabPress(route.name)}
              style={styles.tab}
            >
              {options.tabBarIcon({
                color: isFocused
                  ? theme.colors.primary
                  : theme.colors.secondary,
                focused: isFocused,
              })}
            </TouchableOpacity>
          );
        })}
      </View>

      <If condition={state.index !== centerIndex}>
        <IconButton
          icon="plus"
          onPress={() => onTabPress(centerRoute)}
          style={[
            styles.fab,
            {
              backgroundColor: theme.colors.onPrimary,
              borderColor: theme.colors.outlineVariant,
            },
          ]}
          iconColor={theme.colors.primary}
        />
      </If>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
    ...Shadows.heavy,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: 15,
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 24,
    height: 48,
    width: 48,
  },
});

export default BottomBar;
