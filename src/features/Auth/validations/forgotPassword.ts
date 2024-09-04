import * as Yup from "yup";

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("Por favor, insira um email válido."),
});
