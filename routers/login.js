const express = require('express')
const router = express.Router()

const models = require('../models')
const saltPass = require('../helpers/saltpass')

router.get('/login', (req, res)=>{
  res.render('login', {msg: ''})
})

router.post('/login', (req, res, next)=>{
  models.User.findOne({
    where:{ username: req.body.username}
  })
  .then((user)=>{
    var salted = user.salt
    var password = req.body.password
    var newPassword = saltPass.createHash(password, salted)
    if(user.password == newPassword){
      req.session.login = true
      req.session.role = user.role
      req.session.salt = user.salt
      if (req.session.role == "admin"){
        req.session.authority = "admin"
        req.session.admin = user
        return res.redirect('/home')
      } else{
        req.session.authority = "user"
        req.session.user = user
        return res.redirect('/dashboard')
      }
    } else{
      res.render('login', {msg: 'wrong password'})
    }
  })
  .catch(err=>{
    res.render('login', {msg: 'username doesnt exist'});
  })
})

router.get('/logout', (req, res, next)=>{
  req.session.destroy()
  res.redirect('/login')
})

router.get('/signup', (req, res)=>{
  res.render('signup')
})

router.post('/signup', (req, res)=>{
  models.User.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: "user",
    phone: req.body.phone,
    address: req.body.address
  })
  .then(()=>{
    res.redirect('/login')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router
