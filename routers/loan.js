var express = require('express')
var router = express.Router()
var models =  require('../models')

router.get('/', (req, res)=>{
  res.send('CERITANYA INI 404 NOT FOUND! LOL')
})

router.use((req,res, next)=>{
  if(req.session.authority == 'admin'){
     next();
  } else {
    res.send(`Sorry, user can't access this page`);
  }
})

function getTheFuckingData(){
  return new Promise((resolve, reject)=>{
    models.User.findAll({
      include: [{
        model: models.Equipment
      }]
    }).then(users=>{
      resolve(users)
    }).catch(err=>{
      reject(err)
    })
  })
}

router.get('/approving', (req, res)=>{
  getTheFuckingData()
    .then(users=>{
      res.render('approving', {title:'Loan data that need to be approved', data_users:users})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.get('/approving/appr/:userid/:equipid', (req, res)=>{
  models.UserEquipment.update({
    Approved: true
  },{
    where:{UserId:req.params.userid, EquipmentId:req.params.equipid}
  }).then(()=>{
    res.redirect('/loan/approving')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/approving/rej/:userid/:equipid', (req, res)=>{
  models.UserEquipment.update({
    Removed: true
  },{
    where:{UserId:req.params.userid, EquipmentId:req.params.equipid}
  }).then(()=>{
    res.redirect('/loan/approving')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/period', (req, res)=>{
  getTheFuckingData()
    .then(users=>{
      res.render('period', {title:'Period loan data', data_users:users})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.get('/period/return/:userid/:equipid', (req, res)=>{
  models.UserEquipment.update({
    Returned: true
  },{
    where:{UserId:req.params.userid, EquipmentId:req.params.equipid}
  }).then(()=>{
    res.redirect('/loan/period')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/returned', (req, res)=>{
  getTheFuckingData()
    .then(users=>{
      res.render('returned', {title:'Returned loan data', data_users:users})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.get('/returned/rm/:userid/:equipid', (req, res)=>{
  models.UserEquipment.destroy({
    where:{UserId:req.params.userid, EquipmentId:req.params.equipid}
  }).then(()=>{
    res.redirect('/loan/returned')
  }).catch(err=>{
    res.send(err)
  })
})

module.exports = router
