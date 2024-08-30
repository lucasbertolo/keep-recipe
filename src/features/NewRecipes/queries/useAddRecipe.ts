import { useAuth } from "@/features/Auth/provider";
import { useToast } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { useNewRecipes } from "../hooks";

type AddRecipeProps = {
  recipe: Recipes.Recipe;
};

export const useAddRecipe = () => {
  const auth = useAuth();
  const toast = useToast();
  const { addRecipe } = useNewRecipes();

  return useMutation({
    mutationFn: async ({ recipe }: AddRecipeProps) => {
      return addRecipe({
        userId: auth.session.user?.uid ?? "",
        recipe,
        photos: [],
      });
    },

    onSuccess: () => {
      toast.showToast({
        message: "Receita criada com sucesso",
        type: "success",
      });
    },
  });
};
