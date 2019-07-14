
const express = require('express');
const taskRoute = require('./../task');


const healthCheck = (req, res) => {
  res.status(200).send('OK');
};

const init = (app) => {
  const router = express.Router();
  // API
  router.use('/api/task', taskRoute);

  router.use('/healthcheck', healthCheck);

  app.use(router);
};

module.exports = {
  healthCheck,
  init,
};
