import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "./api";
import { Link } from "react-router-dom";
import type { Recipe } from "./types";

export default function RecipeIndex() {

  const { data, isLoading, error } = useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: getRecipes
  });

  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p>Error loading recipes</p>;

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {data!.map(recipe => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>
              {recipe.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
