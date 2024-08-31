import { useAuth } from "@/features/Auth/provider";
import { Button, Checkbox, Space, Typography } from "@/shared/components";
import { useLocalTheme } from "@/shared/hooks";
import { View } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { useSignOut } from "../../queries";

export const Options = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { toggleTheme, colorScheme } = useLocalTheme();

  const { mutate: signOut } = useSignOut();

  return (
    <View style={{ padding: 16, flex: 1, justifyContent: "space-between" }}>
      <View>
        <Typography variant="subtitle">Dados pessoais</Typography>
        <Space />
        <Typography variant="caption" style={{ color: theme.colors.outline }}>
          Nome do usuário
        </Typography>
        <Typography>{user?.displayName}</Typography>
        <Space />
        <Typography variant="caption" style={{ color: theme.colors.outline }}>
          Email
        </Typography>
        <Typography>{user?.email}</Typography>
        <Space type="lg" />
        <Divider />
        <Space type="lg" />
        <Typography variant="subtitle">Tema</Typography>
        <Space type="lg" />
        <Checkbox
          label="Modo noturno"
          checked={colorScheme === "dark"}
          onPress={() => toggleTheme()}
        />
      </View>

      <View style={{ alignSelf: "flex-start" }}>
        <Button onPress={() => signOut()}>Logout</Button>
      </View>
    </View>
  );
};
