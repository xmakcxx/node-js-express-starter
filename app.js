
const express = require('express');
// eslint-disable-next-line no-unused-vars
const events = require('events');
const bodyParser = require('body-parser');

const app = express();
const tasks = [
  {
    _id: Math.random(),
    name: Math.random()
  }];
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello div World!');
});
app.get('/iven', (req, res) => {
  const myEmit = new events.EventEmitter();
  myEmit.on('some_event', (text) => {
    console.log(text);
  });
  myEmit.emit('some_event', 'Обрабочтик событий сработал');

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
    _id: (tasks[tasks.length - 1]._id + 1),
    name: body.name,
    age: body.age,
  });
  res.send(JSON.stringify(tasks));
});
app.get('/tasks', (req, res) => {
  res.send(JSON.stringify(tasks));
});
app.get('/task/:id', (req, res) => {
  console.log("start");
  const { id } = req.params;
  const task = tasks.find(task => task._id.toString() === id);
  res.send(JSON.stringify(task));
});
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const task = tasks.find(task => task._id.toString() === id);
  const kid = Math.floor(task._id);
  tasks.splice(kid, 1);
   res.send(JSON.stringify(task));
});
app.put('/task/:id', (req, res) => {
  console.log("start");
  const { id } = req.params;
  const task= tasks.find(task => task._id.toString() === id);
  const { body } = req;
  const note = {
    name: body.name,
    age: body.age,
   };
   task.name = note.name;
   task.age = note.age;
  res.send(JSON.stringify(note));
});
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
