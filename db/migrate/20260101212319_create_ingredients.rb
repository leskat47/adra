class CreateIngredients < ActiveRecord::Migration[8.1]
  def change
    create_table :ingredients, id: :uuid do |t|
      t.string :name
      t.string :ingredient_type
      t.boolean :is_staple, default: true, null: false

      t.timestamps
    end
  end
end
