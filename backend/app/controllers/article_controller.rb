class ArticleController < ApplicationController
  def index
    @articles = Article.all
    render json: @articles
  end

  def edit

  end

  def show
    
  end
end
