class PhotosController < ApplicationController

  # URL access: anyone
  # HTTP method: GET
  def index
    # check if whoever made request is logged in
    if session[:current_user_id]
      @logged_in = true
    end

    # find user they are looking for (if exists)
    if params[:id] and User.exists?(params[:id])
  		@user = User.find(params[:id])
  	end
  end

end
