var express = require('express')
var router = express.Router()

var models = require('../models')

router.use((req,res, next)=>{
  if(req.session.authority == 'admin' || req.session.authority == 'user'){
     next();
  } else {
    res.send(`Sorry, user can't access this page`);
  }
})

router.get('/', (req, res)=>{
  // models.User.findOne({
  //   where:{role: 'admin'}
  // })
  // .then((user)=>{
  //   res.render('home', {page: "HOME", user:user})
  // })
  res.render('home', {page: "HOME", user:req.session.admin})
})

module.exports = router
