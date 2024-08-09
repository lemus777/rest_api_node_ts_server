import express from 'express';

const server = express()

// Routing
server.get('/', (req, res) => {

  const datos = [
    { id: 1, nombre: 'Juan' },
    { id: 2, nombre: 'Pablo' },
  ]

  res.json(datos)
})
export default server
