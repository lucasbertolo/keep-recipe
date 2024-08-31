export const formatFirebaseAuthError = (errorCode: string): string => {
  console.log("errorCode", errorCode);
  switch (errorCode) {
    case "auth/invalid-email":
      return "O e-mail fornecido é inválido.";
    case "auth/user-disabled":
      return "Este usuário foi desativado.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    case "auth/email-already-in-use":
      return "O e-mail fornecido já está em uso.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/operation-not-allowed":
      return "Operação não permitida. Entre em contato com o suporte.";
    case "auth/requires-recent-login":
      return "Por favor, faça login novamente para realizar esta operação.";
    case "auth/network-request-failed":
      return "Falha na conexão de rede. Verifique sua conexão com a internet.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/invalid-action-code":
      return "Código de ação inválido ou expirado.";
    case "auth/invalid-credential":
      return "Credenciais inválidas.";
    default:
      return "Ocorreu um erro desconhecido. Tente novamente.";
  }
};
