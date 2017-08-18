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

module.exports = {editData, deleteData}
