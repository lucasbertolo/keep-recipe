import { useAuth } from "@/features/Auth/provider";
import { useToast } from "@/shared/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { RecipeActions } from "@/shared/enums";
import { useMyRecipes } from "../provider";

type RemoveRecipeProps = {
  recipeId: string;
};

export const useRemoveRecipe = () => {
  const auth = useAuth();
  const toast = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { service } = useMyRecipes();

  return useMutation({
    mutationFn: async ({ recipeId }: RemoveRecipeProps) => {
      return service.deleteRecipe(auth.user?.uid ?? "", recipeId);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [RecipeActions.getRecipes],
        exact: false,
      });

      router.replace("/(tabs)");

      toast.showToast({
        message: "Receita removida com sucesso",
        type: "success",
      });
    },
  });
};
