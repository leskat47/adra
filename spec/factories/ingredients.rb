FactoryBot.define do
    factory :ingredient do
      name { "Salt" }
      ingredient_type { "spice" }
      is_staple { true }
    end
  end
  