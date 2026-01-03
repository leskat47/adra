FactoryBot.define do
    factory :recipe_ingredient do
      recipe
      ingredient
      amount { "1 tsp" }
    end
  end
  