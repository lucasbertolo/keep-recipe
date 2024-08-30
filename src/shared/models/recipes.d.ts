declare namespace Recipes {
  type Ingredient = {
    name: string;
    quantity: string;
  };

  type Recipe = {
    userId: string;
    title: string;
    description?: string;
    photos?: string[];
    createdAt?: Date;
    averageMoneySpent?: number;
    tags?: string[];
    steps?: string[];
    category?: "dessert" | "main meal" | "snack";
    isVegan?: boolean;
    isVegetarian?: boolean;
    isGlutenFree?: boolean;
    isDairyFree?: boolean;
    ingredients?: Ingredient[];
    prepTime?: number;
    cookTime?: number;
    totalTime?: number;
    servings?: number;
    difficulty?: "easy" | "medium" | "hard";
    source?: string;
    rating?: number;
    observation?: string;
  };

  type Add = {
    userId: string;
    recipe: Recipe;
    photos: string[];
  };

  interface Actions {
    addRecipe: (params: AddRecipe) => Promise<void>;
    getRecipes: (userId: string) => Promise<Recipe[]>;
    getRecipeById: (userId: string, recipeId: string) => Promise<Recipe | null>;
    editRecipe: (userId: string, recipe: Recipe) => Promise<void>;
    deleteRecipe: (userId: string, recipeId: string) => Promise<void>;
  }
}
