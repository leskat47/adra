import type { Recipe } from "./types";

const API_URL = "http://localhost:3000/api";

export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${API_URL}/recipes`);
  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}

export async function getRecipe(id: string): Promise<Recipe> {
  const res = await fetch(`${API_URL}/recipes/${id}`);
  if (!res.ok) throw new Error("Failed to fetch recipe");
  return res.json();
}
