const SERVER = 'http://localhost:3000/posts'

function display(data){
  let container = document.querySelector('.container')
  container.innerHTML = data[0].content
}

axios.get(SERVER)
  .then(res => {
    console.log(res.data)
    display(res.data)
  })
  .catch(err => console.log(err))
