const fs = require('fs')
const dbPath = './data.json'

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
  const reqPost = dbJSON.posts.find(post => post.id === id)
  if(!reqPost) return {status: 400, message: 'no post found with that id'}
  return reqPost
}

module.exports = {getAll, getOne}
