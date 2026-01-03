import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api";
import type { Recipe } from "../types";

export const useRecipes = () => 
  useQuery<Recipe[]>({
    queryKey: ["recipes"],
    queryFn: getRecipes
});