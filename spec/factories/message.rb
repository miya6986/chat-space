FactoryBot.define do
  factory :message do
    content {Faker::Invoice.reference}
    image {File.open("#{Rails.root}/spec/fixture/image/beach-2213623_960_720.jpg")}
    user
    group
  end
end