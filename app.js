const SERVER = 'http://localhost:3000/posts'

function getAll(){
  axios.get(SERVER)
    .then(res => {
      return showAll(res.data)
    })
    .catch(err => console.log(err))
}

function showAll(data){
  let container = document.querySelector('.container')
  container.innerHTML = ''
  for(let i = 0; i < data.length; i++){
    container.innerHTML += `<h3>${data[i].title}</h3>
    <p>${data[i].content}</p>
    <h5>${data[i].created}</h5>`
  }
}

function getOne(id){
  axios.get(SERVER + id)
    .then(res => {
      return showOne(res.data)
    })
    .catch(err => console.log(err))
}

function showOne(data){
  let container = document.querySelector('.container')
  container.innerHTML =
  `<h3>${data.title}</h3>
  <p>${data.content}</p>
  <h5>${data.created}</h5>`
}

function createPost(data){
  axios.post(SERVER, data)
    .then(res => console.log('made it this far'))
    .catch(err => console.log(err))
}

document.querySelector('#home-button').addEventListener('click', () => {
  getAll()
})

document.querySelector('#create-new').addEventListener('click', () => {
  let container = document.querySelector('.container')
  container.innerHTML = `
    <form>
      <div class="input-group-lg">
        <label for="title-input">Title</label>
        <input class="form-control" type="text" id="title-input">
        <label for="content-input">Post</label>
        <input class="form-control"  id="content-input" type="text" id="content-input">
        <label for="image-input">Image URL</label>
        <input class="form-control" type="url" id="url-input">
        </div>
        <br>
        <button type="button" class="btn btn-primary btn-lg btn-block" id="create-post">Submit</button>
      </div>
    </form>`
    document.querySelector('#create-post').addEventListener('click', () => {
      let title = document.querySelector('#title-input')
      let content = document.querySelector('#content-input')
      let url = document.querySelector('#url-input')
      let data = {title: title.value, content: content.value, url: url.value}
      createPost(data)
      getAll()
    })
})

getAll()
