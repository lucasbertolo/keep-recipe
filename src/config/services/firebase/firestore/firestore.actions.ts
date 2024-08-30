import firestore from "@react-native-firebase/firestore";
import { FirebaseStorageService } from "../storage";
import { cleanData } from "@/shared/utils";

const USERS_COLLECTION = "users";
const RECIPES_COLLECTION = "recipes";

export class FirebaseFirestoreService implements Recipes.Actions {
  async addRecipe({ recipe }: Recipes.Add) {
    try {
      const urls = await FirebaseStorageService.uploadPhotos(
        recipe.userId,
        recipe.photos ?? [],
      );

      const model = cleanData(recipe);

      await firestore()
        .collection(USERS_COLLECTION)
        .doc(recipe.userId)
        .collection(RECIPES_COLLECTION)
        .add({
          ...model,
          photos: urls,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error("Error adding recipes: ", error);
      throw error;
    }
  }

  async deleteRecipe(recipeId: string) {}

  async editRecipe(userId: string, recipe: Recipes.Recipe) {}

  async getRecipes(userId: string) {
    try {
      const recipesSnapshot = await firestore()
        .collection("users")
        .doc(userId)
        .collection("recipes")
        .orderBy("createdAt", "desc")
        .get();

      const recipes = recipesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Recipes.Recipe),
      }));

      return recipes;
    } catch (error) {
      console.error("Error getting recipes: ", error);
      throw error;
    }
  }

  async getRecipeById(userId: string, recipeId: string) {
    try {
      const recipeDoc = await firestore()
        .collection("users")
        .doc(userId)
        .collection("recipes")
        .doc(recipeId)
        .get();

      if (recipeDoc.exists) {
        return recipeDoc.data() as Recipes.Recipe;
      }

      return null;
    } catch (error) {
      console.error("Error getting recipe: ", error);
      throw error;
    }
  }
}
