import { FirebaseFirestoreService } from "@/config/services";
import React, { createContext, useContext, useState } from "react";

const MyRecipesContext = createContext<Recipes.MyRecipesProvider | null>(null);

export const MyRecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipes.Recipe>();
  const firestoreService: Recipes.Actions = new FirebaseFirestoreService();

  return (
    <MyRecipesContext.Provider
      value={{
        service: firestoreService,
        selectedRecipe,
        selectRecipe: setSelectedRecipe,
      }}
    >
      {children}
    </MyRecipesContext.Provider>
  );
};

export const useMyRecipes = (): Recipes.MyRecipesProvider => {
  const context = useContext(MyRecipesContext);

  if (!context) {
    throw new Error("useMyRecipes must be used within an MyRecipesProvider");
  }

  return context;
};
