import firestore from "@react-native-firebase/firestore";
import { FirebaseStorageService } from "../storage";

const USERS_COLLECTION = "users";
const RECIPES_COLLECTION = "recipes";

export class FirebaseFirestoreService implements MyRecipes.Actions {
  async addRecipe({ photos, recipe, userId }: MyRecipes.AddRecipe) {
    try {
      const storage = new FirebaseStorageService();

      const urls = await storage.uploadPhotos(userId, photos);

      await firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection(RECIPES_COLLECTION)
        .add({
          ...recipe,
          photos: urls,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error("Error adding recipes: ", error);
      throw error;
    }
  }

  async deleteRecipe(recipeId: string) {}

  async editRecipe(userId: string, recipe: MyRecipes.Recipe) {}

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
        ...(doc.data() as MyRecipes.Recipe),
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
        return recipeDoc.data() as MyRecipes.Recipe;
      }

      return null;
    } catch (error) {
      console.error("Error getting recipe: ", error);
      throw error;
    }
  }
}
