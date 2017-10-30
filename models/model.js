const fs = require('fs')
const dbPath = './data.json'
const uuid = require('uuid')

const db = fs.readFileSync(dbPath, 'utf-8')
let dbJSON = JSON.parse(db)
dbJSON = dbJSON[0]

function getAll(){
  const db = fs.readFileSync(dbPath, 'utf-8')
  let dbJSON = JSON.parse(db)
  dbJSON = dbJSON[0]
  return dbJSON.posts
}

function getOne(id){
  const db = fs.readFileSync(dbPath, 'utf-8')
  let dbJSON = JSON.parse(db)
  dbJSON = dbJSON[0]
  const reqPost = dbJSON.posts.find(post => post['id'] == id)
  if(!reqPost) return {status: 400, message: 'no post found with that id'}
  return reqPost
}

function create(body){
  const data = schema(body)
  if(data.errors) return data.errors
  const db = fs.readFileSync(dbPath, 'utf-8')
  let dbJSON = JSON.parse(db)
  dbJSON[0].posts.push(data)
  let dbString = JSON.stringify(dbJSON)
  fs.writeFileSync(dbPath, dbString)
  return data
}

function schema(body){
  const post = {id : uuid()}
  if(body.title) post.title = body.title
  if(body.content) post.content = body.content
  if(body.image_url) post.image_url = body.image_url
  post.created = Date.now()
  return post
}

module.exports = {getAll, getOne, create}
