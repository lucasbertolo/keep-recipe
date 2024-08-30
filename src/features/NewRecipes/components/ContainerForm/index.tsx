import { ScrollView } from "react-native";

export const ContainerForm = (props: React.PropsWithChildren) => {
  return (
    <ScrollView contentContainerStyle={{ padding: 18 }}>
      {props.children}
    </ScrollView>
  );
};
