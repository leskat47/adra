require "rails_helper"

RSpec.describe "Api::Recipes", type: :request do
  let!(:ingredient) { create(:ingredient) }
  let!(:recipe) { create(:recipe) }
  let!(:recipe_ingredient) do
    create(:recipe_ingredient, recipe: recipe, ingredient: ingredient)
  end

  let(:headers) do
    { "CONTENT_TYPE" => "application/json" }
  end

  describe "GET /api/recipes" do
    it "returns a list of recipes" do
      get "/api/recipes"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json).to be_an(Array)
      expect(json.first["name"]).to eq(recipe.name)
      expect(json.first["recipe_ingredients"].first["ingredient"]["name"])
        .to eq(ingredient.name)
    end
  end

  describe "GET /api/recipes/:id" do
    it "returns a single recipe" do
      get "/api/recipes/#{recipe.id}"

      expect(response).to have_http_status(:ok)

      json = JSON.parse(response.body)
      expect(json["id"]).to eq(recipe.id)
      expect(json["recipe_ingredients"].length).to eq(1)
    end
  end

  describe "POST /api/recipes" do
    let(:payload) do
      {
        recipe: {
          name: "New Recipe",
          instructions: [
            { title: "Prep", step: "Chop things" }
          ],
          recipe_ingredients_attributes: [
            {
              ingredient_id: ingredient.id,
              amount: "2 cups"
            }
          ]
        }
      }.to_json
    end

    it "creates a recipe with ingredients" do
      expect {
        post "/api/recipes", params: payload, headers: headers
      }.to change(Recipe, :count).by(1)
        .and change(RecipeIngredient, :count).by(1)

      expect(response).to have_http_status(:created)

      json = JSON.parse(response.body)
      expect(json["name"]).to eq("New Recipe")
      expect(json["instructions"].first["title"]).to eq("Prep")
    end
  end

  describe "PATCH /api/recipes/:id" do
    let(:payload) do
      {
        recipe: {
          name: "Updated Name"
        }
      }.to_json
    end

    it "updates the recipe" do
      patch "/api/recipes/#{recipe.id}", params: payload, headers: headers

      expect(response).to have_http_status(:ok)
      expect(recipe.reload.name).to eq("Updated Name")
    end
  end

  describe "DELETE /api/recipes/:id" do
    it "deletes the recipe but not ingredients" do
      expect {
        delete "/api/recipes/#{recipe.id}"
      }.to change(Recipe, :count).by(-1)
        .and change(RecipeIngredient, :count).by(-1)
        .and change(Ingredient, :count).by(0)

      expect(response).to have_http_status(:no_content)
    end
  end
end
