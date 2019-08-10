class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :title, null: false
      t.index :title, unique: true
      t.timestamps
    end
  end
end
