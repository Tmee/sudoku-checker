require './server/server'

app   = Rack::Directory.new(File.join(Dir.pwd, '/app'))
bower = Rack::Directory.new(File.join(Dir.pwd, '/vendor'))

run Rack::URLMap.new(
                     "/" => app,
                     "/api" => SudokuChecker,
                     "/vendor" => bower
                     )