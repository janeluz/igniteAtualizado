import http from 'node:http'; 

// para diferenciar um modulo interno do node

const server =  http.createServer((req,res) =>{
return res.end("Hello world!")
})

server.listen(3333)