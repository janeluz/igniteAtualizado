import http from 'node:http'

// para diferenciar um modulo interno do node

const users = []
const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method == 'GET' && url === '/users') {
    //tranformando array em string
    return res
      .setHeader('content-type', 'application/json')
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'Janee',
      email: 'janeteste.com'
    })
    return res.writeHead(201).end('add user')
  }
  return res.writeHead(404).end('Hello world')
})

server.listen(3334)
