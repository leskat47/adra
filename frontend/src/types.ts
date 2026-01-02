export interface Ingredient {
    id: string;
    name: string;
    ingredient_type: string;
  }
  
  export interface RecipeIngredient {
    id: string;
    amount: string;
    ingredient: Ingredient;
  }
  
  export interface Recipe {
    id: string;
    name: string;
    calories: number;
    fat: number;
    protein: number;
    fiber: number;
    servings: number;
    recipe_type: "main" | "sauce" | "soup" | "salad" | "side";
    instructions: string[]; // JSONB instructions array
    recipe_ingredients: RecipeIngredient[];
  }
  