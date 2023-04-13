import http from 'node:http'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

// para diferenciar um modulo interno do node

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

 await json(req,res)

  if (method === "GET" && url === "/users") {
    //tranformando array em string
    const users = database.select("users")

    return res.end(JSON.stringify(users))
  }

  if (method === "POST" && url === "/users") {
    const {name, email} = req.body

  const user = {
      id: 1,
      name: "Janee",
      email: "janeteste.com",
      name,
      email,
    }

    database.insert("users",user)
    return res.writeHead(201).end("add user")
  }
  return res.writeHead(404).end("Hello world")
})

server.listen(3232)
