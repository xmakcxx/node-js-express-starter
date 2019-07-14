const express = require('express');
const ctrl = require('./task.ctrl');

const router = express.Router();
router.get('/', ctrl.getTasks.bind(ctrl));

module.exports = router;
