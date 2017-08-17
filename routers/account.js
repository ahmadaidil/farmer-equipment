var express = require('express')
var router = express.Router()

var models =  require('../models')

router.get('/admin', (req, res)=>{
  models.User.findAll({
    where:{role: "admin"}
  })
  .then((admins)=>{
      res.render('admin', {data_admins: admins})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/user', (req, res)=>{
  models.User.findAll({
    where:{role: "user"}
  })
  .then((users)=>{
      res.render('user', {data_users: users})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/add', (req, res)=>{
  res.render('newAccount', {msg: ''})
})


router.post('/add', (req, res)=>{
  models.User.create(req.body)
  .then(()=>{
    res.render('newAccount', {msg: 'Succesfull create account'})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/user/edit/:id', (req, res)=>{
  models.User.findById(req.params.id)
  .then((user)=>{
    res.render('editUser', {edit_user:user})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/admin/edit/:id', (req, res)=>{
  models.User.findById(req.params.id)
  .then((admin)=>{
    res.render('editAdmin', {edit_admin:admin})
  })
  .catch(err=>{
    res.send(err)
  })
})

function editData(req){
  return new Promise((resolve, reject)=>{
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
      resolve()
    })
    .catch(err=>{
      reject(err)
    })
  })
}

router.post('/admin/edit/:id', (req, res)=>{
  editData(req).then(()=>{
    res.redirect('/account/admin')
  }).catch(err=>{
    res.send(err)
  })
})

router.post('/user/edit/:id', (req, res)=>{
  editData(req).then(()=>{
    res.redirect('/account/user')
  }).catch(err=>{
    res.send(err)
  })
})

function deleteData(req){
  return new Promise((resolve, reject)=>{
    models.User.destroy({
      where:{id: req.params.id}
    })
    .then(()=>{
      resolve()
    })
    .catch(err=>{
      res.send(err)
    })
  })
}

router.get('/admin/delete/:id', (req, res)=>{
  deleteData(req).then(()=>{
    res.redirect('/account/admin')
  })
})

router.get('/user/delete/:id', (req, res)=>{
  deleteData(req).then(()=>{
    res.redirect('/account/user')
  })
})

router.get('/user/assign/:id',(req, res)=>{
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

router.post('/user/assign/:id', (req, res)=>{
  models.UserEquipment.create({
    UserId: req.params.id,
    EquipmentId: req.body.EquipmentId,
    TglPeminjaman: req.body.TglPeminjaman,
    TglPengembalian: req.body.TglPengembalian,
    Qty: req.body.Qty,
    Approved: false,
    Returned: false
  })
  .then(()=>{
    res.redirect(`/account/user`)
  })
  .catch(err=>{
    res.send(err)
  })
})

module.exports = router
