const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello div World!');
});

app.get('/tasks', (req, res) => {
  const tasks = [
    {
      _id: Math.random(),
      name: Math.random()
    }
  ];
  const { query } = req;
  tasks.push({
    _id: Math.random(),
    name: query.name,
    age: query.age
  });
  res.send(JSON.stringify(tasks));
});

app.get('/task/2.1', (req, res) => {
  const result = { info: 'text' };
  res.send(JSON.stringify(result));
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
