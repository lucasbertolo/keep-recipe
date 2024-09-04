import {
  containLowercase,
  containNumber,
  containUppercase,
  containWhitespace,
  noSpecialCharacters,
} from "@/shared/utils";
import * as Yup from "yup";

const errorRequired = "Senha obrigatória";
const errorUppercase = "Senha deve conter uma letra maiúscula";
const errorLowercase = "Senha deve conter uma letra minúscula";
const errorNumber = "Senha deve conter um número";
const errorLength = "Senha deve entre 8 e 15 caracteres";
const errorWhitespaces = "Senha não pode conter espaços";
const errorConfirmPassword = "Senhas não conferem";

export const registerSchema = Yup.object().shape({
  displayName: Yup.string()
    .required("Por favor, insira um nome usuário válido.")
    .min(3, "Usuário precisa de pelo menos 3 caracteres")
    .max(20, "Usuário pode ter no máximo 20 caracteres")
    .test(
      "displayName",
      "Usuário não pode conter caractere especial",
      (item) => {
        if (!item) return false;

        return noSpecialCharacters(item);
      },
    ),
  email: Yup.string()
    .email("Email inválido")
    .required("Por favor, insira um email válido."),
  password: Yup.string()
    .default("")
    .min(8, errorLength)
    .required(errorRequired)
    .test("uppercase", errorUppercase, containUppercase)
    .test("lowercase", errorLowercase, containLowercase)
    .test("number", errorNumber, containNumber)
    .test("whitespace", errorWhitespaces, containWhitespace),
  confirmNewPassword: Yup.string()
    .required(errorRequired)
    .oneOf([Yup.ref("password")], errorConfirmPassword),
});
