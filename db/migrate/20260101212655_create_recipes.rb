class CreateRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :recipes, id: :uuid do |t|
      t.string :name
      t.string :source
      t.jsonb :instructions, default: []
      t.integer :calories
      t.integer :fat
      t.integer :protein
      t.integer :fiber
      t.integer :servings
      t.string :recipe_type, default: 'main'

      t.timestamps
    end
  end
end
