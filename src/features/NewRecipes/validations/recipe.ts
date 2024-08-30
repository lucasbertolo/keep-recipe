import * as Yup from "yup";

export const recipeSchema = Yup.object().shape({
  userId: Yup.string().required(),
  createdAt: Yup.date(),
  title: Yup.string()
    .required("É necessário colocar um título")
    .max(30, "Título deve ter no máximo 30 caracteres"),
  description: Yup.string(),
  category: Yup.string().oneOf(["main meal", "dessert", "snack"]).required(),
  steps: Yup.array().of(
    Yup.object().shape({
      description: Yup.string()
        .required("É necessário colocar um nome")
        .max(500, "Campo excede o limite de caracteres"),
      index: Yup.number(),
    }),
  ),
  tags: Yup.array().of(Yup.string()),
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
  difficulty: Yup.string().oneOf(["easy", "medium", "hard"]),
  observation: Yup.string(),
  rating: Yup.number(),
  source: Yup.string(),
});
