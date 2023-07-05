require 'sinatra'

# Create a hash to track the number of requests for each page
request_counter = {}

before do
  path = request.path_info
  # Update the request count for the current page
  request_counter[path] = request_counter.fetch(path, 0) + 1
  # Log the page and request count
  puts "Page: #{path}\n"
end

get '/' do
  'Hello, World!'
end