var express = require('express')
var router = express.Router()

router.use((req,res, next)=>{
  if(req.session.authority == 'admin'){
     next();
  } else {
    res.send(`Sorry, you can't access this page`);
  }
})

router.get('/', (req, res)=>{
  res.render('home')
})

module.exports = router
