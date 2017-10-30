const SERVER = 'http://localhost:3000/posts'

axios.get(SERVER)
  .then(res => console.log(res))
  .catch(err => console.log(err))
