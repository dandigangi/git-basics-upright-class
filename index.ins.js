const express = require('express')
const port = 8080
const app = express()

console.log('__dirname', __dirname)
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded())
app.use(express.json())

app.get('/', (req, res) => {
  // res.send('<h1>GET "/" route matched</h1>')
  res.sendFile(__dirname + '/index.html')
})

app.get('/login', (req, res) => {
  // res.send('<h1>GET "/login" route matched</h1>')
  res.sendFile(__dirname + '/login.html')
})

app.post('/login', (req, res) => {
  // console.log(req.query)
  console.log(
    `POST attempt detected at "/login" with username ${req.query.username} and password ${req.query.password}`,
  )
  res.sendFile(__dirname + '/login-success.html')
  // console.log(req.params)
})

app.get('/pokemon/:name', (req, res) => {
  // res.send('<h1>GET "/pokemon/:name" route matched</h1>')
  const validPokemon = ['pikachu', 'charmander', 'squirtle']

  if (validPokemon.find((pokemonName) => pokemonName === req.params.name)) {
    res.send(
      `<h1>GET "/pokemon/:name" route matched with "${req.params.name}"</h1><img src='/images/${req.params.name}.jpg' />`,
    )
  } else {
    res.send(
      `<h1>GET "/pokemon/:name" route matched but no valid Pokemon name</h1><img src='/images/error.jpg' />`,
    )
  }
})

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`)
})
