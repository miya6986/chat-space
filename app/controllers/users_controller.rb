class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE(?) and id NOT IN (?)', "%#{search_params[:keyword]}%", excluded_users)
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end

  def search_params
    params.permit(:keyword, :user_ids)
  end

  def excluded_users
    excluded_users = []
    excluded_users << current_user.id
    if params[:user_ids]
      params[:user_ids].map do |user_id|
        excluded_users << user_id.to_i
      end
    end
    return excluded_users
  end

end
