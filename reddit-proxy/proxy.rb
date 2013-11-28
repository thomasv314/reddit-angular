require 'sinatra'
require 'sinatra/json'
require 'httparty'
use Rack::Logger
helpers Sinatra::JSON

PROXY_URL = "http://reddit.com/"

helpers do
  def logger
    request.logger
  end

  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = "*"
    headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS"
    headers['Access-Control-Allow-Headers'] ="accept, authorization, origin"
  end
end

get '/*' do
  set_cors_headers
  url = PROXY_URL + params[:captures].first
  json HTTParty.get(url)
end

options '/*' do
  set_cors_headers
end
