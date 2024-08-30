import { useAuth } from "@/features/Auth/provider";
import { useQuery } from "@tanstack/react-query";
import { useMyRecipes } from "../hooks";

type GetRecipeProps = {};

export const useGetRecipes = () => {
  const auth = useAuth();
  const { getRecipes } = useMyRecipes();

  return useQuery({
    queryKey: ["getRecipes"],
    queryFn: async () => {
      // return getRecipes(auth.session.user?.uid ?? "");

      const mock: Recipes.Recipe[] = [
        {
          userId: "uahusfhuads",
          title: "Bolo de limão",
          photos: [
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
          ],
          totalTime: 200,
          servings: 5,
          category: "dessert",
          tags: ["azedinha"],
        },

        {
          userId: "uahusfhuads",
          title: "Bolo de pinga",
          photos: [
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
            "https://picsum.photos/200",
          ],
          totalTime: 200,
          servings: 5,
          category: "dessert",
          tags: ["azedinha"],
        },
      ];

      return mock;
    },
  });
};
