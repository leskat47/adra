module Api
  class RecipesController < ApplicationController
    def index
      recipes = Recipe.all.includes(:recipe_ingredients, :ingredients)
      render json: recipes.to_json(include: { recipe_ingredients: { include: :ingredient } })
    end

    def show
      recipe = Recipe.find(params[:id])
      render json: recipe.to_json(include: { recipe_ingredients: { include: :ingredient } })
    end

  end
end
