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

function create(req, res, next){
  let response = models.create(req.body)
  //error handling here
  res.status(201).send(response)
}


module.exports = {getOne, getAll, create}
