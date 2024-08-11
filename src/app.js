import express, { json } from 'express';

const server = express();
server.use(json());

const items = [
]

server.get('/items', (req, res) => {
})

server.get('/items/:id', (req, res) => {
})

server.post('/items', (req, res) => {
  const {name, quantity, type} = req.body;
  if (items.find(element => element.name === name)) return res.sendStatus(409);
  if (Object.getOwnPropertyNames(req.body).length !== 3 || !name || !quantity || !type) return res.sendStatus(422);
  const newItem = {id:items.length+1,...req.body};
  items.push(newItem);
  res.status(201).send(newItem);
})

server.listen(5000, () => {
  console.log("Server Running");
})