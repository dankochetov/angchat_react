require 'coffee-script'

express = require 'express'
router = express.Router()

config =
	'new user': '0'
	'update users': '1'
	'get history': '2'
	'history': '3'
	'get private history': '4'
	'private history': '5'
	'send message': '6'
	'new message': '7'
	'send private message': '8'
	'new private message': '9'
	'listener event': '10'
	'clear history': '11'
	'get room': '12'
	'room': '13'
	'get rooms': '14'
	'delete room': '15'
	'admin:delete room': '16'
	'kick': '17'
	'comment': '18'
	'get friends': '19'
	'add friend': '20'
	'remove friend': '21'
	'get user': '22'
	'user': '23'
	'admin:get users': '24'
	'set rank': '25'
	'admin:delete user': '26'
	'leave room': '27'
	'admin:get stats': '28'
	'admin:stats': '29'
	'admin:users': '30'
	'rooms': '31'
	'users': '32'
	'friends': '33'
	'autoLogin': '34'
	'autoLogout': '35'
	'ping': '36'
	'pong': '37'


router.get '/getconfig', (req, res, next) ->
	res.end JSON.stringify config

module.exports = router