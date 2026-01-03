module Api
  class RecipesController < ApplicationController
    before_action :set_recipe, only: [:show, :update, :destroy]
    def index
      recipes = Recipe.all.includes(:recipe_ingredients, :ingredients)
      render json: recipes.to_json(include: { recipe_ingredients: { include: :ingredient } })
    end

    def show
      recipe = Recipe.find(params[:id])
      render json: recipe.to_json(include: { recipe_ingredients: { include: :ingredient } })
    end

    def create
      recipe = Recipe.new(recipe_params)

      if recipe.save
        render json: recipe,
               include: { recipe_ingredients: { include: :ingredient } },
               status: :created
      else
        render json: { errors: recipe.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    def update
      if @recipe.update(recipe_params)
        render json: @recipe,
               include: { recipe_ingredients: { include: :ingredient } }
      else
        render json: { errors: @recipe.errors.full_messages },
               status: :unprocessable_entity
      end
    end

    def destroy
      @recipe.destroy
      head :no_content
    end

    private

    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    def recipe_params
      params.require(:recipe).permit(
        :name,
        :calories,
        :fat,
        :fiber,
        :protein,
        :servings,
        :source,
        :recipe_type,
        instructions: [:title, :step],
        recipe_ingredients_attributes: [
          :id,
          :ingredient_id,
          :amount,
          :_destroy
        ]
      )
    end
  end
end
