const express = require('express');
// eslint-disable-next-line no-unused-vars
const events = require('events');
const bodyParser = require('body-parser');
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const app = express();
let tasks = [];
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Expires, Strict-Transport-Security, Content-Security-Policy, X-Csrf-Token');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello div World!');
});
app.get('/iven', (req, res) => {
  // eslint-disable-next-line global-require

  fs.readFile('temp.txt', (err, buf) => {
    console.log(buf.toString());
  });

  res.send('Hello div World!');
});
app.get('/tichen1', (req, res) => {
  // eslint-disable-next-line global-require
  const things = require('./things');

  console.log(things.array_c([1, 6, 99, 8, 45, 8]));
  console.log(things.mlt);
  res.send('HeLoo lex');
});
app.get('/zadacha1', (req, res) => {
  const getSecondsToday = () => {
    const dat = new Date();
    const today = new Date(dat.getFullYear(), dat.getMonth(), dat.getDate() + 1);
    const diff = today - dat;
    return Math.floor(diff / 1000);
  };
  const la = console.log(getSecondsToday());
  res.send(la);
});

app.post('/task', (req, res) => {
  const { body } = req;
  tasks.push({
    _id: uuidv4(),
    title: body.title,
    author: body.author,
  });
  return fs.writeFile('temp.txt', JSON.stringify(tasks), (err) => {
    if (err) console.log(err);
    res.send(JSON.stringify(tasks));
    console.log('Successfully Written to File.{a [');
  });
});
app.get('/tasks', (req, res) => {
  res.send(JSON.stringify(tasks));
});
app.get('/task/:id', (req, res) => {
  console.log('start');
  const { id } = req.params;
  // eslint-disable-next-line no-shadow
  const task = tasks.find(task => task._id.toString() === id);
  res.send(JSON.stringify(task));
});
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  // eslint-disable-next-line no-shadow
  const task = tasks.find(task => task._id.toString() === id);
  const kid = Math.floor(task._id);
  tasks.splice(kid, 1);
  res.send(JSON.stringify(task));
});
app.put('/task/:id', (req, res) => {
  console.log('start');
  const { id } = req.params;
  // eslint-disable-next-line no-shadow
  const task = tasks.find(task => task._id.toString() === id);
  const { body } = req;
  const note = {
    name: body.name,
    age: body.age,
  };
  task.name = note.name;
  task.age = note.age;
  res.send(JSON.stringify(note));
});
fs.readFile('temp.txt', (err, data) => {
  if (err) throw err;
  tasks = JSON.parse(data);
  console.log(data);
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
});
