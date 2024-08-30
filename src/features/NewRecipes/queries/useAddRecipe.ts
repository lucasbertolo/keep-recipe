import { useAuth } from "@/features/Auth/provider";
import { useToast } from "@/shared/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNewRecipes } from "../hooks";
import { useRouter } from "expo-router";
import { RecipeActions } from "@/shared/enums";

type AddRecipeProps = {
  recipe: Recipes.Recipe;
};

export const useAddRecipe = () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { service } = useNewRecipes();

  return useMutation({
    mutationFn: async ({ recipe }: AddRecipeProps) => {
      const model = { ...recipe, userId: auth.user?.uid ?? "" };

      return service.addRecipe({
        recipe: model,
      });
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [RecipeActions.getRecipes],
        exact: false,
      });

      router.replace("/(tabs)");

      toast.showToast({
        message: "Receita criada com sucesso",
        type: "success",
      });
    },
  });
};
