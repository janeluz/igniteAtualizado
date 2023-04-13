import http from 'node:http'
import { json } from './middlewares/json.js'
import {routes } from './routes.js'

// para diferenciar um modulo interno do node

const server = http.createServer(async (req, res) => {
  const { method, url } = req

 await json(req,res)

 const route = routes.find(route => {
  return route.method === method && route.path ===url
 })

 if(route) {
  return route.handler(req,res)
 }
  return res.writeHead(404).end('Hello world')
})

server.listen(3232)
