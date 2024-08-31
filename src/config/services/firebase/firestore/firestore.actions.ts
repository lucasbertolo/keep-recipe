import firestore from "@react-native-firebase/firestore";
import { FirebaseStorageService } from "../storage";
import { cleanData } from "@/shared/utils";

const USERS_COLLECTION = "users";
const RECIPES_COLLECTION = "recipes";

type TimestampDate = {
  nanoseconds?: number;
  seconds?: number;
};

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
      throw error;
    }
  }

  static getDate({ nanoseconds, seconds }: TimestampDate) {
    if (!seconds || !nanoseconds) return {};

    const fireBaseTime = new Date(seconds * 1000 + nanoseconds / 1000000);
    const date = fireBaseTime.toDateString();
    const atTime = fireBaseTime.toLocaleTimeString();

    return { date, atTime };
  }
}
