import { View } from "react-native";

export const CardPhoto = (props: React.PropsWithChildren) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        position: "relative",
      }}
    >
      {props.children}
    </View>
  );
};
