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
import { LinkText } from "../../components";
import { useForgotPassword } from "../../queries";
import { forgotPasswordSchema } from "../../validations";

type Fields = InferType<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { mutate: sendEmail, isPending } = useForgotPassword();

  const handleResetPassword: SubmitHandler<Fields> = async (data) => {
    sendEmail(data.email);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onSubmit",
  });

  const navigateToLogin = () => {
    reset({});
    router.back();
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

      <Space />

      <Button
        mode="contained"
        onPress={handleSubmit(handleResetPassword)}
        loading={isPending}
      >
        Reiniciar senha
      </Button>

      <LinkText
        text=""
        textAction="Voltar para o login?"
        action={navigateToLogin}
      />
    </WrapperForm>
  );
}
