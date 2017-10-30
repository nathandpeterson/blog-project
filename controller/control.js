const models = require('../models/model.js')

function getAll(req, res, next){
  let data = models.getAll()
  //error handling here
  res.status(200).send(data)
}

function getOne(req, res, next) {
  let data = models.getOne(req.params.id)
  //error handling here
  res.status(200).send(data)
}


module.exports = {getOne, getAll}
