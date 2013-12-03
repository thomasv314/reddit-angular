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

  def clone_headers
    headers = {}
    request.env.each do |key, val|
      if key == "HTTP_X_MODHASH"
        headers['X-Modhash'] = val
      elsif key == "HTTP_SET_COOKIE"
        headers['Cookie'] = val
      end 
      logger.info "Header: #{key} = #{val}"
    end
    headers
  end

  def set_cors_headers
    headers['Access-Control-Allow-Origin'] = "*"
    headers['Access-Control-Allow-Methods'] = "GET, POST, PUT, DELETE, OPTIONS"
    headers['Access-Control-Allow-Headers'] ="set-cookie, x-modhash, accept, content-type, authorization, origin"
  end
end

get '/*', provides: :json do
  set_cors_headers
  url = PROXY_URL + params[:captures].first
  options = { 
    headers: clone_headers
  }
  json HTTParty.get(url, options)
end

post '/*', provides: :json do
  set_cors_headers
  url = PROXY_URL + params[:captures].first
  options = { 
    body: params[:data],
    headers: clone_headers 
  }
  json HTTParty.post(url, options)
end

options '/*', provides: :json do
  set_cors_headers
end
