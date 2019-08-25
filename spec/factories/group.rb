FactoryBot.define do
  factory :group do
    title {Faker::ProgrammingLanguage.name}
  end
end