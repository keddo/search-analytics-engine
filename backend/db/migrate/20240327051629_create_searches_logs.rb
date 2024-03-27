class CreateSearchesLogs < ActiveRecord::Migration[7.1]
  def change
    create_table :searches_logs do |t|
      t.text :text
      t.string :user_ip
      t.integer :count

      t.timestamps
    end
  end
end
