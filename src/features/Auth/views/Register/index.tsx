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
import { useCreateUser } from "../../queries";
import { registerSchema } from "../../validations";

type Fields = InferType<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { mutate: createUser } = useCreateUser();

  const handleRegister: SubmitHandler<Fields> = async (data) => {
    createUser({ email: data.email, password: data.password });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(registerSchema),
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
            returnKeyType="next"
          />
        )}
      />
      <Space />

      <Controller
        control={control}
        name="confirmNewPassword"
        render={({ field }) => (
          <PasswordInput
            value={field.value}
            label={"Confirmar a senha"}
            onChangeText={(text) => field.onChange(text)}
            error={!!errors.confirmNewPassword}
            errorText={errors.confirmNewPassword?.message}
            returnKeyType="done"
          />
        )}
      />

      <Space />

      <Button mode="contained" onPress={handleSubmit(handleRegister)}>
        Registrar
      </Button>

      <LinkText
        text="Já possui conta?"
        textAction="Login"
        action={() => router.back()}
      />
    </WrapperForm>
  );
}
