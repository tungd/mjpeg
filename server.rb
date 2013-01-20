
require 'sinatra'

set :server, :thin
set :port, 5000

get '/html' do
  # TODO:
end

get '/jpeg' do
  # TODO:
end

get '/mjpeg' do
  boundary = "hello"

  status 200
  headers "Content-Type" => "multipart/x-mixed-replace;boundary=#{boundary}\n"

  stream do |out|
    (1..250).each do |i|
      out << "--#{boundary}"
      out << "Content-Type: image/jpeg\n\n"
      out << File.read("img/#{i % 16 + 1}.jpg")
      sleep 0.04
    end
  end
end

get '/' do
  [200, {'Content-Type' => 'text/html'}, ['Hello, World!']]
end
