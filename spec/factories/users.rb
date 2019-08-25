FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(min_length: 8)
    name {Faker::Superhero.name}
    email {Faker::Internet.safe_email}
    password {password}
    password_confirmation {password}
  end
end