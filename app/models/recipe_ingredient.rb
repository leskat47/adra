class RecipeIngredient < ApplicationRecord
  belongs_to :ingredient
  belongs_to :recipe

  validates :ingredient_id, uniqueness: { scope: :recipe_id }
end
