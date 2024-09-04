import {
  Button,
  Logo,
  Space,
  TextInput,
  Typography,
  WrapperForm,
} from "@/shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InferType } from "yup";
import { LinkText, PasswordInput } from "../../components";
import { useAuth } from "../../provider";
import { useSignIn } from "../../queries";
import { loginSchema } from "../../validations";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";

type Fields = InferType<typeof loginSchema>;

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();

  const { reloadUser, user } = useAuth();

  const { mutate: signIn, isPending } = useSignIn();

  useFocusEffect(
    useCallback(() => {
      if (user) reloadUser();
    }, [user]),
  );

  const handleLogin: SubmitHandler<Fields> = async (data) => {
    signIn({ email: data.email, password: data.password });
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(loginSchema),
    mode: "onSubmit",
  });

  const navigateToRegister = () => {
    reset({});
    router.push("./register");
  };

  const navigateToReset = () => {
    reset({});
    router.push("./forgot-password");
  };

  return (
    <WrapperForm>
      <Space type="lg" />

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
      <TouchableOpacity style={styles.reset} onPress={navigateToReset}>
        <Typography
          style={{ color: theme.colors.primary }}
          fontType="semibold"
          variant="caption"
        >
          Esqueceu sua senha?
        </Typography>
      </TouchableOpacity>

      <Space />

      <Button
        mode="contained"
        onPress={handleSubmit(handleLogin)}
        loading={isPending}
      >
        Login
      </Button>

      <LinkText
        text="Não possui conta?"
        textAction="Registrar"
        action={navigateToRegister}
      />
    </WrapperForm>
  );
}

const styles = StyleSheet.create({
  reset: {
    alignSelf: "flex-end",
  },
});
