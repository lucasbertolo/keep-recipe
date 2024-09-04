import {
  Button,
  Logo,
  Space,
  Typography,
  WrapperForm,
} from "@/shared/components";
import { useAuth } from "../../provider";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSendEmailVerification } from "../../queries";

export default function VerifyEmailScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuth();

  const { mutate: sendEmailVerification, isPending } =
    useSendEmailVerification();

  const handleGoBack = () => {
    router.navigate("./login");
  };

  return (
    <WrapperForm>
      <Logo />

      <Typography style={styles.title} variant="subtitle">
        Aguardando Verificação Email
      </Typography>
      <Space />
      <Typography>
        Por favor, verifique seu email clicando no link que foi enviado para o
        email: {user?.email}
      </Typography>

      <Space type="lg" />

      <Button mode="contained" onPress={handleGoBack}>
        Ir ao login
      </Button>

      <View style={styles.row}>
        <Typography>Não chegou o email? </Typography>
        <TouchableOpacity
          onPress={() => sendEmailVerification()}
          disabled={isPending}
        >
          <Typography style={[styles.resend, { color: theme.colors.primary }]}>
            Enviar novamente
          </Typography>
        </TouchableOpacity>
      </View>
    </WrapperForm>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  resend: {
    textDecorationLine: "underline",
  },
});
