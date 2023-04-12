import http from 'node:http'
import { json } from './middlewares/json.js'

// para diferenciar um modulo interno do node

const users = []
const server = http.createServer(async (req, res) => {
  const { method, url } = req

 await json(req,res)

  if (method === 'GET' && url === '/users') {
    //tranformando array em string
    return res
      .setHeader('content-type', 'application/json')
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/users') {
    const {name, email} = req.body

    users.push({
      id: 1,
      name: 'Janee',
      email: 'janeteste.com',
      name,
      email,
    })
    return res.writeHead(201).end('add user')
  }
  return res.writeHead(404).end('Hello world')
})

server.listen(3333)
