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

  async deleteRecipe(userId: string, recipeId: string) {
    try {
      const recipeDoc = await firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection(RECIPES_COLLECTION)
        .doc(recipeId)
        .get();

      if (!recipeDoc.exists)
        throw new Error("Receita não existente, tente novamente");

      const recipeData = recipeDoc.data();

      if (recipeData?.photos) {
        const deletePromises = recipeData.photos.map(
          async (photoUrl: string) => {
            await FirebaseStorageService.deletePhoto(photoUrl);
          },
        );

        await Promise.all(deletePromises);
      }

      await firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection(RECIPES_COLLECTION)
        .doc(recipeId)
        .delete();
    } catch (error) {
      throw error;
    }
  }

  async editRecipe(userId: string, recipe: Recipes.Recipe) {}

  async getRecipes(userId: string) {
    try {
      const recipesSnapshot = await firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection(RECIPES_COLLECTION)
        .orderBy("createdAt", "desc")
        .get();

      const recipes = recipesSnapshot.docs.map((doc) => ({
        ...(doc.data() as Recipes.Recipe),
        id: doc.id,
      }));

      return recipes;
    } catch (error) {
      throw error;
    }
  }

  async getRecipeById(userId: string, recipeId: string) {
    try {
      const recipeDoc = await firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection(RECIPES_COLLECTION)
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

  async getTags(userId: string) {
    try {
      const recipesSnapshot = await firestore()
        .collection(USERS_COLLECTION)
        .doc(userId)
        .collection(RECIPES_COLLECTION)
        .get();

      const tags = recipesSnapshot.docs.map((doc) => doc.data().tags);

      const uniqueTags = [...new Set(tags.flat())];

      return uniqueTags;
    } catch {
      return [];
    }
  }
}
