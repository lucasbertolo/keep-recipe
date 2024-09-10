# Projeto de Receitas

Este é um aplicativo de receitas onde os usuários podem adicionar, editar e visualizar suas próprias receitas. As receitas podem incluir fotos e são armazenadas de forma privada para cada usuário.

![login](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTFjY3Y2cHQ3cWE4eHNkcmtpZ25jMmc4dmxyb2l5MHZpMDF3cHZubiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6eQbWrCwAAWMDeTgaQ/giphy.gif)
![recipes](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzIydmhscjk0bTkxbmE5aHF5amVpcm82NmR6MnJraGw4anhneGNvMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/35n2purDmO5lMde50y/giphy.gif)
![new recipe](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2Y1ZG1nbmkzNjl1OTI0djd6Z2k1bTY2d21rdnJqZzV3dWt6MGx5ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6ZnFAXvCMWcVblVdqc/giphy.gif)
![new recipe final](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2t3ZGc1MmhjeHJmc3FmZTFocmY2b3huaXZmNmdkajU4cTBhbWZvNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lu46fqyDAwBnXwKBGi/giphy.gif)


## Explicação projeto (Vídeo)

- https://drive.google.com/file/d/1QAOSHehFyry-ZiG0MNiJSCPRwTcU6efj/view?usp=share_link

## Builds(v1.0.0)

- Android: https://expo.dev/accounts/lucasbertolo2/projects/keep-recipes/builds/a5b3151c-6700-4268-9688-9f36cc47de0a

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

   ```git clone https://github.com/lucasbertolo/keep-recipe```
   
   ```cd keep-recipe```

2. **Instale as dependências:**

   ```npm i```

   ```yarn install```

3. **Inicie o projeto com Expo:**

   Ios: ```npx expo run:ios```

   Android: ```npx expo run: android```
   

   Para rodar somente o servidor expo: ```npx expo start```

## Dicas para Rodar o Projeto

- Ambiente de Desenvolvimento: Se estiver testando em um emulador iOS, certifique-se de que todas as permissões (como câmera e galeria) estão devidamente configuradas.
- Expo CLI: Para evitar erros de compatibilidade, sempre use a versão recomendada de Expo para cada pacote (verifique o package.json).


## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
