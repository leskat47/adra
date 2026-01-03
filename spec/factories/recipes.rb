FactoryBot.define do
    factory :recipe do
      name { "Test Recipe" }
      recipe_type { "main" }
      instructions do
        [
          { title: "Step 1", step: "Do something" }
        ]
      end
    end
  end
  