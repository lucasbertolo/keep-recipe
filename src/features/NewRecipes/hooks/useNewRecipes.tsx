import { FirebaseFirestoreService } from "@/config/services";

export const useNewRecipes = () => {
  const firestoreService: Recipes.Actions = new FirebaseFirestoreService();

  return { ...firestoreService };
};
