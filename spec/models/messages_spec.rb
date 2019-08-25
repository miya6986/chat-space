require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context "can save" do
      it "can save a message only a image" do
        expect(build(:message)).to be_valid
      end

      it "can save a message only a content" do
        message = build(:user, image: nil)
        expect(message).to be_valid
      end

      it "can save a message with content and image" do
        message = build(:user)
        expect(message).to be_valid
      end
    end

    context "can not save" do
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invaid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end

