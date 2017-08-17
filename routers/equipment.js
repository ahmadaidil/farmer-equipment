var express = require('express')
var router = express.Router()
const models = require('../models')

// router.use((req,res, next)=>{
//   if(req.session.authority == 'admin'){
//      next();
//   } else {
//     res.send(`Sorry, user can't access this page`);
//   }
// })

router.get('/', (req, res)=>{
  models.Equipment.findAll()
    .then(equipments=>{
      res.render('equipment', {equip:equipments, title:'All Data Equipments', page: "EQUIPMENT"})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.get('/add', (req, res)=>{
  res.render('addEquipment', {title:'Add Equipment',page:"ADD EQUIPMENT FORM"})
})

router.post('/add', (req, res)=>{
  models.Equipment.create(req.body)
    .then(()=>{
      res.redirect('/equipment')
    })
    .catch(err=>{
      res.send(err)
    })
})

router.get('/edit/:id', (req, res)=>{
  models.Equipment.findById(req.params.id)
    .then(equipment=>{
      res.render('editEquipment', {title: 'Edit Equipment', equip:equipment, page:"EDIT EQUIPMENT FORM"})
    })
    .catch(err=>{
      res.send(err)
    })
})

router.post('/edit/:id', (req, res)=>{
  models.Equipment.update({
    name_attr:req.body.name_attr,
    spec:req.body.spec
  },{
    where: {id:req.params.id}
  }).then(()=>{
    res.redirect('/equipment')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req, res)=>{
  models.Equipment.destroy({
    where:{id:req.params.id}
  }).then(()=>{
    res.redirect('/equipment')
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/:id/users', (req, res) => {
  models.Equipment.findById(req.params.id)
    .then(equip=>{
      equip.getUsers()
        .then(users=>{
          equip['users'] = users
          res.render('viewBorrower', {equip:equip ,  title: 'List Rental by', page:'LIST RENTALER'})
        })
        .catch(err=>{
          res.send(err)
        })
    })
    .catch(err=>{
      res.send(err)
    })
})

module.exports = router
