var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var path = require('path');

var app = express()

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

var login = require('./routers/login')
var index = require('./routers/index')
var home = require('./routers/home')
var loan = require('./routers/loan')
var account = require('./routers/account')
var equipment = require('./routers/equipment')

app.use(session({
  secret: '!$#$59&%^*&)(rdj*_&$#!@$_()+!)',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use('/', login)
app.use('/', index)
app.use('/home', home)
app.use('/loan', loan)
app.use('/account', account)
app.use('/equipment', equipment)


app.listen(3000,()=>{
  console.log("Hai, Im F*cking Listener");
})
