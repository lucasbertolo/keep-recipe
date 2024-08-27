import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("Por favor, insira um usuário válido."),
  password: Yup.string()
    .default("")
    .required("Por favor, insira uma senha válida."),
  confirmNewPassword: Yup.string()
    .required("Por favor, insira uma senha válida.")
    .oneOf([Yup.ref("password")], "Senhas não conferem"),
});
