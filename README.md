# DB設計

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association_members
- belongs_to :group
- belongs_to :user


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

### Association_users
- has_many :groups, through: :members
- has_many :members
- has_many :comments


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|

### Association_users
- has_many :users, through: :members
- has_many :members
- has_many :comments


## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|comment|text|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association_comments
- belongs_to :user
- belongs_to :group
