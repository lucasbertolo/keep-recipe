import { FirebaseFirestoreService } from "@/config/services";

export const useMyRecipes = () => {
  const firestoreService: MyRecipes.Actions = new FirebaseFirestoreService();

  return { ...firestoreService };
};
