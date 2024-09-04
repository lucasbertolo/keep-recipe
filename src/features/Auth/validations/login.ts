import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("Por favor, insira um email válido."),
  password: Yup.string()
    .default("")
    .required("Por favor, insira uma senha válida."),
});
