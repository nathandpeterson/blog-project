const models = require('../models/model.js')

function getAll(req, res, next){
  let data = models.getAll()
  res.status(200).send(data)
}

function getOne(req, res, next) {
  let data = models.getOne(req.params.id)
  if(!data) return status(404).send({error: 'no such post!'})
  res.status(200).send(data)
}

function create(req, res, next){
  let response = models.create(req.body)
  if(!response) status(400).send({error: 'cannot create post! try again!'})
  res.status(201).send(response)
}

function update(req, res, next){
  let data = models.update(req.params.id, req.body)
  //error handling here
  res.status(201).send(data)
}

function destroy(req, res, next){
    let data = models.destroy(req.params.id)
    //error handling here
    res.status(201).send(data)
}


module.exports = {getOne, getAll, create, update, destroy}
