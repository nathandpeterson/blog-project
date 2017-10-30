const SERVER = 'http://localhost:3000/posts'

function display(data){
  let container = document.querySelector('.container')
  container.innerHTML = `<h3>${data[0].title}</h3>
  <p>${data[0].content}</p>
  <h5>${data[0].created}</h5>`
}

function showAll(data){
  let container = document.querySelector('.container')
  for(let i = 0; i < data.length; i++){
    container.innerHTML += `<h3>${data[i].title}</h3>
    <p>${data[i].content}</p>
    <h5>${data[i].created}</h5>`
  }
}

//where to call this?
function showOne(post){
  let container = document.querySelector('.container')
    container.innerHTML += `<h3>${data.title}</h3>
    <p>${data.content}</p>
    <h5>${data.created}</h5>`
}

axios.get(SERVER)
  .then(res => {
    // display(res.data)
    showAll(res.data)
  })
  .catch(err => console.log(err))
