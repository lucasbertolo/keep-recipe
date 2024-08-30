# Projeto de Receitas

Este é um aplicativo de receitas onde os usuários podem adicionar, editar e visualizar suas próprias receitas. As receitas podem incluir fotos e são armazenadas de forma privada para cada usuário.

## Funcionalidades

- Adicionar receitas com fotos
- Filtrar receitas por diversos filtros, como categoria e dificuldade
- Exibir as receitas
- Utilizar autenticação Firebase
- Armazenar fotos no Firebase Storage
- Usar Firestore para armazenar informações das receitas

## Tecnologias Utilizadas

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [@react-native-firebase/storage](https://rnfirebase.io/storage/usage)
- [@react-native-firebase/firestore](https://rnfirebase.io/firestore/usage)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (v14 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

## Como Rodar o Projeto

1. **Clone o repositório:**

   ```git clone https://github.com/lucasbertolo/keep-recipe
   ```cd keep-recipe

2. **Instale as dependências:**

   ```npm install

   ```yarn install

3. **Configure o Firebase:**

Crie um projeto no Firebase.
Adicione as configurações geradas ao criar os serviços de storage/firestore/auth do Firebase na src/config/services/firebase

4. **Inicie o projeto com Expo:**

   ```npx expo start

## Dicas para Rodar o Projeto

- Erros de Permissão: Certifique-se de configurar as permissões corretas no Firebase Firestore e Storage.
- Ambiente de Desenvolvimento: Se estiver testando em um emulador iOS, certifique-se de que todas as permissões (como câmera e galeria) estão devidamente configuradas.
- Expo CLI: Para evitar erros de compatibilidade, sempre use a versão recomendada de Expo para cada pacote (verifique o package.json).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
