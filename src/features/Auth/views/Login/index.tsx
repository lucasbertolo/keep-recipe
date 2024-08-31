import {
  Button,
  Logo,
  Space,
  TextInput,
  WrapperForm,
} from "@/shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InferType } from "yup";
import { LinkText, PasswordInput } from "../../components";
import { useSignIn } from "../../queries";
import { loginSchema } from "../../validations";

type Fields = InferType<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { mutate: signIn, isPending } = useSignIn();

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
