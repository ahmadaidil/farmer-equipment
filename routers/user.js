var express = require('express')
var router = express.Router()

var models =  require('../models')

router.get('/', (req, res)=>{
  models.User.findAll()
  .then((users)=>{
      res.render('user', {data_users: users})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('addUser')
})

router.post('/add', (req, res)=>{
  models.User.create(req.body)
  .then(()=>{
    res.redirect('/user')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req, res)=>{
  models.User.findById(req.params.id)
  .then((user)=>{
    res.render('editUser', {edit_user: user})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req, res)=>{
  models.User.update({
    name: req.body.name,
    email: req.body.email,
    telp: req.body.phone,
    address: req.body.address
  },{
    where: {
      id: req.params.id
    }
  })
  .then(()=>{
    res.redirect('/user')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  models.User.destroy({where:{id: req.params.id}})
  .then(()=>{
    res.redirect('/user')
  })
})

router.get('/assign/:id',(req, res)=>{
  models.User.findById(req.params.id)
  .then((user)=>{
    models.Equipment.findAll()
    .then((equip)=>{
      res.render('assign-equipment', {data_user : user, data_equip: equip})
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/assign/:id', (req, res)=>{
  models.UserEquipment.create({
    UserId: req.params.id,
    EquipmentId: req.body.EquipmentId,
    TglPengembalian: new Date(),
    Qty: req.body.Qty,
    Approved: false,
    Returned: false
  })
  .then(()=>{
    res.redirect(`/user`)
  })
  .catch(err=>{
    res.send(err)
  })
})

// router.get('/borrow/:id', (req, res)=>{
//   models.User.findByIds
// })

module.exports = router
