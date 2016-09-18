require('coffee-script')

express = require 'express'
mongo = require 'mongodb'
mongoose = require 'mongoose'
router = express.Router()
bcrypt = require 'bcrypt-nodejs'
passport = require 'passport'
User = require '../models/user'
Stats = require '../models/stats'
dateFormat = require '../public/coffee/date.format'

router.get '/', (req, res, next) ->
  if req.isAuthenticated()
    res.render 'chat/index'
  else
    res.render 'index/index'

router.get '/index', (req, res, next) -> res.render 'index/default'

router.get '/signin', (req, res, next) -> res.render 'index/signin'

router.get '/signin/fb', passport.authenticate 'facebook'
router.get '/signin/fb/cb', passport.authenticate('facebook', failureRedirect: '/'), (req, res, next) ->
  require('../sockets')(req.app.locals.sockjs, req.app.locals.connections).autoLogin()
  Stats.inc ['users', 'signedIn']
  res.end()
  #res.redirect '/'

router.get '/signin/vk', passport.authenticate 'vkontakte'
router.get '/signin/vk/cb', passport.authenticate('vkontakte', failureRedirect: '/'), (req, res, next) ->
    Stats.inc ['users', 'signedIn']
    require('../sockets')(req.app.locals.sockjs, req.app.locals.connections).autoLogin()
    res.end()
    #res.redirect '/'


router.post '/signin', (req, res, next) ->
  req.checkBody('login', 'Login field is empty!').notEmpty()
  req.checkBody('password', 'Password field is empty!').notEmpty()
  errors = req.validationErrors()
  if errors then return res.end(JSON.stringify(errors))
  passport.authenticate('local', (err, user, info) ->
    if info then errors = [{msg: info.error}]
    if err then return next(err)
    if !user then return res.end(JSON.stringify(errors))
    req.logIn user, (err) ->
      if err then return next(err)
      require('../sockets')(req.app.locals.sockjs, req.app.locals.connections).autoLogin()
      Stats.inc ['users', 'signedIn']
      res.end 'success'
  ) req, res, next

router.get '/signup', (req, res, next) ->
  if req.isAuthenticated()
    res.end '<h1>Error!</h1>You are already logged in'
  else
    res.render 'index/signup'

router.post '/signup', (req, res, next) ->
  login = req.body.login
  username2 = username = req.body.username
  if !username then username = login
  password = req.body.password
  password2 = req.body.password2
  req.checkBody('login', 'Login field is empty!').notEmpty()
  req.checkBody('password', 'Password field is empty!').notEmpty()
  req.checkBody('password', 'Passwords do not match!').equals password2
  password = bcrypt.hashSync(password)
  err = {}
  User.findOne { login: login }, (err, user) ->
    if err then next err
    errors = req.validationErrors()
    if !errors then errors = []
    if user then errors.push msg: 'User already exists!'
    if errors.length > 0
      res.end JSON.stringify(errors)
    else
      user = new User(
        login: login
        username: username
        password: password)
      user.save (err) ->
        if err then return next(err)
        req.logIn user, (err) ->
          if err
            return next(err)
          require('../sockets')(req.app.locals.sockjs, req.app.locals.connections).autoLogin()
          Stats.inc ['users', 'signedUp']
          res.end 'success'

router.get '/logout', (req, res, next) ->
  if req.isAuthenticated()
    req.logout()
    require('../sockets')(req.app.locals.sockjs, req.app.locals.connections).autoLogout()
    res.end 'logged out'
  else
    res.end 'not logged'

module.exports = router