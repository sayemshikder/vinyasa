# == Schema Information
#
# Table name: projects
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  team_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Project < ApplicationRecord
  validates :title, presence: true

  has_many :project_memberships
  has_many :members,
    through: :project_memberships,
    source: :user
  belongs_to :team
  has_many :tasks
end
