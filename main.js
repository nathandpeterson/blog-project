const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.disable('x-powered-by')
const cors = require('cors')
app.use(cors())

app.get('/', (req, res, next)=>{
  res.status(200).json({data: 'go to /posts for blog posts'})
})

const blogRoutes = require('./router/router.js')
app.use('/posts', blogRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error : err})
})

app.use((req, res, next) => {
  const message = error.message ||'Not found'
  res.status(404).json({ error: { message: message }})
})

const listener = () => console.log(`:) Server is listening on port ${port}!`)
app.listen(port, listener)
