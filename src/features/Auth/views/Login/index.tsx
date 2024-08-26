import {
  Button,
  Logo,
  Space,
  TextInput,
  Typography,
  WrapperForm,
} from "@/shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { InferType } from "yup";
import { PasswordInput } from "../../components";
import { useSignIn } from "../../queries";
import { loginSchema } from "../../validations";
import { useTheme } from "react-native-paper";

type Fields = InferType<typeof loginSchema>;

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { mutate: signIn } = useSignIn();

  const handleLogin: SubmitHandler<Fields> = async (data) => {
    signIn({ email: data.email, password: data.password });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  return (
    <WrapperForm>
      <Logo />

      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextInput
            label="Email"
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            returnKeyType="next"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            error={!!errors.email?.message}
            errorText={errors.email?.message}
          />
        )}
      />
      <Space />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordInput
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            error={!!errors.password}
            errorText={errors.password?.message}
            returnKeyType="done"
          />
        )}
      />

      <Space />

      <Button mode="contained" onPress={handleSubmit(handleLogin)}>
        Login
      </Button>

      <View style={styles.row}>
        <Typography style={{ color: theme.colors.secondary }}>
          Não possui conta?
        </Typography>

        <TouchableOpacity onPress={() => router.replace("./register")}>
          <Typography style={[styles.link, { color: theme.colors.primary }]}>
            {" "}
            Registrar
          </Typography>
        </TouchableOpacity>
      </View>
    </WrapperForm>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },

  link: {
    fontWeight: "bold",
  },
});
