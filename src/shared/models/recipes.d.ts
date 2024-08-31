declare namespace Recipes {
  type Ingredient = {
    name: string;
    quantity: string;
  };

  type Difficulty = "easy" | "medium" | "hard";

  type Category = "dessert" | "meal" | "snack";

  type Recipe = {
    userId: string;
    title: string;
    description?: string;
    photos?: string[];
    createdAt?: { nanoseconds: number; seconds: number };
    averageMoneySpent?: number;
    tags?: string[];
    steps?: string[];
    category?: Category;
    isVegan?: boolean;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
    isDairyFree?: boolean;
    ingredients?: Ingredient[];
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    servings?: number;
    difficulty?: Difficulty;
    source?: string;
    rating?: number;
    observation?: string;
  };

  type Filters = {
    category: string[];
    difficulty: string[];
    isVegan: boolean;
    isVegetarian: boolean;
    isGlutenFree: boolean;
    isDairyFree: boolean;
    prepTime: number;
    servings: number;
    tags: string[];
  };

  type Add = {
    recipe: Recipe;
  };

  interface Actions {
    addRecipe: (params: Add) => Promise<void>;
    getRecipes: (userId: string) => Promise<Recipe[]>;
    getRecipeById: (userId: string, recipeId: string) => Promise<Recipe | null>;
    editRecipe: (userId: string, recipe: Recipe) => Promise<void>;
    deleteRecipe: (userId: string, recipeId: string) => Promise<void>;
    getTags: (userId: string) => Promise<string[]>;
  }

  type MyRecipesProvider = {
    service: Actions;
    selectedRecipe?: Recipe;
    selectRecipe: (e: Recipe) => void;
  };
}
