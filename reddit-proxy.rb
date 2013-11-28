require 'sinatra'
require 'sinatra/json'
require 'httparty'
use Rack::Logger
helpers Sinatra::JSON

PROXY_URL = "http://www.reddit.com/"

disable :protection

helpers do
  def logger
    request.logger
  end

  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = "*"
    headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS"
    headers['Access-Control-Allow-Headers'] ="accept, content-type, authorization, origin"
  end
end

get '/*', provides: :json do
  set_cors_headers
  url = PROXY_URL + params[:captures].first
  json HTTParty.get(url)
end

post '/*', provides: :json do
  set_cors_headers
  url = PROXY_URL + params[:captures].first
  options = { :body => params[:data] }
  json HTTParty.post(url, options)
end

options '/*', provides: :json do
  set_cors_headers
end
