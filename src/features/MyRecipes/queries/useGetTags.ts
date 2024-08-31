import { useAuth } from "@/features/Auth/provider";
import { useQuery } from "@tanstack/react-query";
import { RecipeActions } from "@/shared/enums";
import { useMyRecipes } from "../provider";

export const useGetTags = () => {
  const auth = useAuth();

  const { service } = useMyRecipes();

  return useQuery({
    queryKey: [RecipeActions.getTags, auth.user?.uid],
    queryFn: async () => {
      return service.getTags(auth.user?.uid ?? "");
    },
  });
};
