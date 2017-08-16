var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var index = require('./routers/index')
var user = require('./routers/user')
var equipment = require('./routers/equipment')

app.use('/', index)
app.use('/user', user)
app.use('/equipment', equipment)


app.listen(3000,()=>{
  console.log("Hai, Im Listener");
})
