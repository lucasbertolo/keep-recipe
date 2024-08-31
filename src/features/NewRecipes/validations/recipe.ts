import * as Yup from "yup";

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
  prepTime: Yup.number().min(0),
  cookTime: Yup.number().min(0),
  totalTime: Yup.number().min(0),
  servings: Yup.number().min(1),
  difficulty: Yup.string().oneOf(["easy", "medium", "hard"]).required(),
  observation: Yup.string(),
  rating: Yup.number(),
  source: Yup.string(),
});
