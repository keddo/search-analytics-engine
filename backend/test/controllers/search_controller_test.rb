require "test_helper"

class SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get search_create_url
    assert_response :success
  end

  test "should get analytics" do
    get search_analytics_url
    assert_response :success
  end

  test "should get search" do
    get search_search_url
    assert_response :success
  end
end
