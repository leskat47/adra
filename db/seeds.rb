# db/seeds.rb

# Clear old data
puts "Clearing old data..."
RecipeIngredient.destroy_all
Recipe.destroy_all
Ingredient.destroy_all
puts "Done clearing old data"

puts "Creating first ingredient..."

# Ingredients
salt = Ingredient.create!(name: "Salt", ingredient_type: "spice", is_staple: true)
puts "Ingredient created!"
tofu = Ingredient.create!(name: "Extra firm tofu", ingredient_type: "protein", is_staple: false)
olive_oil = Ingredient.create!(name: "Olive Oil", ingredient_type: "oil", is_staple: true)

# Recipe
recipe = Recipe.create!(
  name: "Grilled Tofu",
  calories: 400,
  protein: 35,
  fat: 10,
  fiber: 0,
  servings: 2,
  recipe_type: "main", 
  instructions: [
    "Season tofu with salt and pepper",
    "Brush with olive oil",
    "Heat a grill pan over medium heat",
    "Cook tofu 6-7 minutes per side until done"
  ]
)

# Recipe ingredients
RecipeIngredient.create!(recipe: recipe, ingredient: salt, amount: "1 tsp")
RecipeIngredient.create!(recipe: recipe, ingredient: tofu, amount: "200g")
RecipeIngredient.create!(recipe: recipe, ingredient: olive_oil, amount: "1 tbsp")
