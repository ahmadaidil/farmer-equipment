const express = require('express')
const router = express.Router()

const models = require('../models')
const authority = require('../helpers/authority')
const saltPass = require('../helpers/saltpass')

router.get('/login', (req, res)=>{
  res.render('login')
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
      if (authority(req.session.role)) {
        res.redirect('/dashboard')
      } else{
        res.redirect('/login')
      }
    }
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
