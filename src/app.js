import express, { json } from 'express';

const server = express();
server.use(json());

const items = [
]

server.get('/items', (req, res) => {
  let filteredItems = items;
  if(req.query.type) filteredItems = items.filter(item => item.type === req.query.type.toLowerCase());
  res.send(filteredItems);
})

server.get('/items/:id', (req, res) => {
  if (!Number.isInteger(Number(req.params.id))) return res.sendStatus(400)
  const filteredItems = items.find(element => element.id === parseInt(req.params.id));
  if (!filteredItems) return res.sendStatus(404)
  res.send(filteredItems);
})

server.post('/items', (req, res) => {
  const {name, quantity, type} = req.body;
  if (items.find(item => item.name === name)) return res.sendStatus(409);
  if (Object.getOwnPropertyNames(req.body).length !== 3 || !name || !quantity || !type) return res.sendStatus(422);
  const newItem = {id:items.length+1,...req.body,type:type.toLowerCase()};
  items.push(newItem);
  res.status(201).send(newItem);
})

server.listen(5000, () => {
  console.log("Server Running");
})