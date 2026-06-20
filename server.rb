require 'webrick'

root = File.expand_path('/Users/kodi/Desktop/kodiakrichards-website')

server = WEBrick::HTTPServer.new(
  Port:        3456,
  DocumentRoot: root,
  Logger:      WEBrick::Log.new($stderr, WEBrick::BasicLog::WARN),
  AccessLog:   []
)

trap('INT')  { server.shutdown }
trap('TERM') { server.shutdown }

server.start
