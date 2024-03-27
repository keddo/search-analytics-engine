class SearchController < ApplicationController
  def create
  end

  def analytics
  end

  def search
    query = params[:query]
    if query.present? && query.length >= 3
      SearchLogger.log(request.remote_ip, query)
      articles = Article.where("title ILIKE ?", "%#{query}%")
      render json: { results: articles }
    else
      render json: { error: 'Query too short' }, status: :unprocessable_entity
    end
  end
end
