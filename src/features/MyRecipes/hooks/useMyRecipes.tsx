import { FirebaseFirestoreService } from "@/config/services";

export const useMyRecipes = () => {
  const firestoreService: Recipes.Actions = new FirebaseFirestoreService();

  return { service: firestoreService };
};
