import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InferType } from "yup";
import { PasswordInput } from "../../components";
import { useCreateUser } from "../../queries";
import { registerSchema } from "../../validations";
import {
  Button,
  Logo,
  Space,
  TextInput,
  Typography,
  WrapperForm,
} from "@/shared/components";
import { useTheme } from "react-native-paper";

type Fields = InferType<typeof registerSchema>;

export default function RegisterScreen() {
  const theme = useTheme();
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
            placeholder="Email"
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
    </WrapperForm>
  );
}
