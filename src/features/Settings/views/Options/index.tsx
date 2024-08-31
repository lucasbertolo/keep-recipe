import { useAuth } from "@/features/Auth/provider";
import { Button, Space, Typography } from "@/shared/components";
import { View } from "react-native";
import { useSignOut } from "../../queries";
import { Divider, Switch } from "react-native-paper";
import { useLocalTheme } from "@/shared/hooks";

export const Options = () => {
  const { user } = useAuth();
  const { toggleTheme, colorScheme } = useLocalTheme();

  const { mutate: signOut } = useSignOut();

  return (
    <View style={{ padding: 16, flex: 1, justifyContent: "space-between" }}>
      <View>
        <Typography variant="subtitle">Dados pessoais</Typography>
        <Space />
        <Typography>{user?.displayName}</Typography>
        <Space />
        <Typography>{user?.email}</Typography>
        <Space type="lg" />
        <Divider />
        <Space type="lg" />
        <Typography variant="subtitle">Tema</Typography>
        {/* <Switch onChange={toggleTheme} value={colorScheme === "dark"}>
          Modo noturno
        </Switch> */}
      </View>

      <View style={{ alignSelf: "flex-start" }}>
        <Button onPress={() => signOut()}>Logout</Button>
      </View>
    </View>
  );
};
