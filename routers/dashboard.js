var express = require('express')
var router = express.Router()

var models = require('../models')

router.use((req,res, next)=>{
  if(req.session.authority == 'user'){
     next();
  } else {
    res.send(`Sorry, you're not user`);
  }
})

function getTheFvckingData(req){
  return new Promise((resolve, reject)=>{
    models.User.findOne({
      where: {id: req.session.user.id},
      include:[{
        model: models.Equipment
      }]
    })
    .then((user)=>{
      resolve(user)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

router.get('/', (req, res)=>{
  getTheFvckingData(req)
    .then(user=>{
      res.render('dashboard', {u: user})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.get('/newLoan', (req, res)=>{
  getTheFvckingData(req)
    .then(user=>{
      models.Equipment.findAll()
        .then(equips=>{
          res.render('newLoan', {u:user, equips:equips})
        })
    })
    .catch(err=>{
      res.send(err)
    })
})

router.post('/newLoan', (req, res)=>{
  models.UserEquipment.create({
    UserId: req.session.user.id,
    EquipmentId: req.body.EquipmentId,
    TglPeminjaman: req.body.TglPeminjaman,
    TglPengembalian: req.body.TglPengembalian,
    Qty: req.body.Qty,
    Approved: false,
    Returned: false
  })
  .then(()=>{
    res.redirect('/dashboard')
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router
