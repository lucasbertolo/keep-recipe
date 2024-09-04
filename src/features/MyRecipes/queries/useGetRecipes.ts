import { useAuth } from "@/features/Auth/provider";
import { useQuery } from "@tanstack/react-query";
import { RecipeActions } from "@/shared/enums";
import { useMyRecipes } from "../provider";

export const useGetRecipes = () => {
  const auth = useAuth();

  const { service } = useMyRecipes();

  return useQuery({
    queryKey: [RecipeActions.getRecipes, auth.user?.uid],
    queryFn: async () => {
      return service.getRecipes(auth.user?.uid ?? "");
    },
    staleTime: 60 * 1000 * 30, // 120 min
  });
};
