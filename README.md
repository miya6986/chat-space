# DB設計

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association_members
- belongs_to :group
- belongs_to :user


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|username|string|null: false|
|useremail|string|null: false|
|userpassword|string|null: false|

### Association_users
- has_many :groups, through: :members
- has_many :members
- has_many :comments


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association_users
- has_many :users, through: members
- has_many :members
- has_many :comments


## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|comment|text|null: false|
|image|mediumblob|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association_comments
- belongs_to :user
- belongs_to :group
