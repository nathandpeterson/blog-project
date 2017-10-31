const fs = require('fs')
const dbPath = './data.json'
const uuid = require('uuid')
const timestamp = require('time-stamp')

function getAll(){
  const db = fs.readFileSync(dbPath, 'utf-8')
  let dbJSON = JSON.parse(db)
  return dbJSON[0].posts
}

function getOne(id){
  const db = fs.readFileSync(dbPath, 'utf-8')
  let dbJSON = JSON.parse(db)
  const reqPost = dbJSON[0].posts.find(post => post['id'] == id)
  if(!reqPost) return {status: 404, message: 'no post found with that id'}
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

function update(id, body){
  body.edited = true
  const data = schema(body)
  //error handling here
  if(data.errors) return data.errors
  const db = fs.readFileSync(dbPath, 'utf-8')
  let dbJSON = JSON.parse(db)
  const reqPost = dbJSON[0].posts.find(post => post['id'] == id)
  for(let i = 0; i < dbJSON[0].posts.length; i++){
      console.log(dbJSON[0].posts[i].title)
  }
  return data
}

function destroy(id){
  const db = fs.readFileSync(dbPath, 'utf-8')
  let dbJSON = JSON.parse(db)
  const filteredDB = dbJSON[0].posts.filter(post => post['id'] != id)
  //Error handling here
  const dbWrapper = [{"posts": filteredDB}]
  let dbString = JSON.stringify(dbWrapper)
  fs.writeFileSync(dbPath, dbString)
  return filteredDB
}

function schema(body){
  const post = {id : uuid()}
  if(body.title) post.title = body.title
  if(body.content) {
    post.content = body.content
  } else {
    return post.error = {message: 'no content'}
  }
  if(body.image_url) post.image_url = body.image_url

  if(body.edited) {
    post.edited = timestamp('HH:mm:ss:MM/DD/YYYY')
  } else {
    post.created = timestamp('HH:mm:ss:MM/DD/YYYY')
  }
  //error handling here!
  return post
}

module.exports = {getAll, getOne, create, update, destroy}
