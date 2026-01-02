import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRecipe } from "./api";
import type { Recipe } from "./types";

export default function RecipeShow() {
  const { id } = useParams<{ id: string }>();

  const { data: recipe, isLoading, error } = useQuery<Recipe>({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id!),
    enabled: !!id,
  });

  if (isLoading) return <p>Loading recipe...</p>;
  if (error || !recipe) return <p>Error loading recipe</p>;

  return (
    <div>
      <h1>{recipe.name}</h1>

      <h2>Ingredients</h2>
      <ul>
        {recipe.recipe_ingredients.map((ri) => (
          <li key={ri.id}>
            {ri.amount} {ri.ingredient.name}
          </li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      <h2>Nutrition</h2>
      <ul>
        <li>Calories: {recipe.calories}</li>
        <li>Protein: {recipe.protein}g</li>
        <li>Fat: {recipe.fat}g</li>
        <li>Fiber: {recipe.fiber}g</li>
        <li>Servings: {recipe.servings}</li>
      </ul>
    </div>
  );
}
