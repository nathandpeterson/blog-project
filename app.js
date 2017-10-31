const SERVER = 'http://localhost:3000/posts'
const state = {}

function getAll(){
  axios.get(SERVER)
    .then(res => {
      state.current = res.data
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
    <button type="button" class="btn btn-outline-secondary show-one" id='${data[i].id}'>Read More</button>
    <hr>`
  }
  let showPostButtons = document.querySelectorAll('.show-one')
  for(let i = 0; i < showPostButtons.length; i++){
    showPostButtons[i].addEventListener('click', function(e){
      getOne(e.target.id)
    })
  }
}

function getOne(id){
  axios.get(SERVER + '/' + id)
    .then(res => {
      return showOne(res.data)
    })
    .catch(err => console.log(err))
}

function showOne(data){
  let container = document.querySelector('.container')
  container.innerHTML =
  `<h2>${data.title}</h2>
  <div class='image-wrapper'>
    <img src="${data.image_url}">
  </div>
  <p>${data.content}</p>
  <h5>${data.created}</h5>`
  data.edited ? container.innerHTML += `<h5>Edited: ${data.edited}</h5>` : null
  buildButtons(data)
}

function buildButtons(data){
  let container = document.querySelector('.container')
  container.innerHTML +=
  `<button type="button" class="btn btn-primary btn-lg btn-block update-item" id="${data.id}">EDIT POST</button>
  <button type="button" class="btn btn-primary btn-lg btn-block delete-item" id="${data.id}">DELETE POST</button>`
  document.querySelector('.update-item').addEventListener('click', () => {
    console.log('update!')
  })
  document.querySelector('.delete-item').addEventListener('click', () => {
    console.log('delets!')
  })
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
      let data = {title: title.value, content: content.value, image_url: url.value}
      createPost(data)
      getAll()
    })
})

getAll()
