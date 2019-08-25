FactoryBot.define do
  factory :message do
    content {Faker::Invoice.reference}
    image {File.open("#{Rails.root}/public/uploads/message/image/1/beach-2213623_960_720.jpg")}
    user
    group
  end
end