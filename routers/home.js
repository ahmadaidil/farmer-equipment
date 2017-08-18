var express = require('express')
var router = express.Router()

// router.use((req,res, next)=>{
//   if(req.session.authority == 'admin' || req.session.authority == 'user'){
//      next();
//   } else {
//     res.send(`Sorry, user can't access this page`);
//   }
// })

router.get('/', (req, res)=>{
  res.render('home', {page: "HOME"})
})

module.exports = router
