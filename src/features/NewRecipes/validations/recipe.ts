import * as Yup from "yup";

const errorMustBeInMinutes = "Tempo deve ser em minutos";

export const recipeSchema = Yup.object().shape({
  title: Yup.string()
    .required("É necessário colocar um título")
    .max(30, "Título deve ter no máximo 30 caracteres"),
  description: Yup.string(),
  category: Yup.string()
    .oneOf(["meal", "dessert", "snack"])
    .required("É necessário escolher uma categoria"),
  steps: Yup.array().of(
    Yup.object().shape({
      description: Yup.string()
        .required("É necessário colocar um nome")
        .max(500, "Campo excede o limite de caracteres"),
      index: Yup.number(),
    }),
  ),
  tags: Yup.array().of(Yup.string().required()),
  photos: Yup.array()
    .of(Yup.string().required())
    .min(1, "É necessário pelo menos 1 imagem")
    .required("É necessário pelo menos 1 imagem"),
  isVegan: Yup.boolean(),
  isVegetarian: Yup.boolean(),
  isGlutenFree: Yup.boolean(),
  isDairyFree: Yup.boolean(),
  ingredients: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("É necessário colocar um nome"),
      quantity: Yup.string().required("É necessário colocar uma quantidade"),
    }),
  ),
  prepTime: Yup.number()
    .transform((value) => (!!value ? +value?.toString() : 0))
    .min(0, "Deve ter mais do que 1 minuto")
    .integer(errorMustBeInMinutes)
    .max(1000, "Acima do limite de tempo permitido"),
  cookTime: Yup.number()
    .transform((value) => (!!value ? +value?.toString() : 0))
    .integer(errorMustBeInMinutes)
    .min(0, "Deve ter mais do que 1 minuto")
    .max(1000, "Acima do limite de tempo permitido"),
  totalTime: Yup.number().min(0),
  servings: Yup.number().min(1),
  difficulty: Yup.string()
    .oneOf(["easy", "medium", "hard"])
    .required("É necessário escolher uma dificuldade"),
  observation: Yup.string(),
  rating: Yup.number(),
  source: Yup.string(),
});
