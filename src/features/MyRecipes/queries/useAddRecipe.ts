import { useAuth } from "@/features/Auth/provider";
import { useToast } from "@/shared/hooks";
import { useMutation } from "@tanstack/react-query";
import { useMyRecipes } from "../hooks";

type AddRecipeProps = {
  recipe: MyRecipes.Recipe;
};

export const useAddRecipe = () => {
  const auth = useAuth();
  const toast = useToast();
  const { addRecipe } = useMyRecipes();

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
