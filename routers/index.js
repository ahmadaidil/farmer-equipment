var express = require('express')
var router = express.Router()

// router.use((req,res, next)=>{
//   if(req.session.authority == 'admin' || req.session.authority == "user"){
//      next();
//   } else {
//     res.send(`Sorry, don't have appart on this app`);
//   }
// })


router.get('/', (req, res)=>{
  if(req.session.role == 'admin'){
    res.redirect('/home')
  } else{
    res.redirect('/dashboard')
  }

})

module.exports = router
