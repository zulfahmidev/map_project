const express = require('express');
const router = express.Router();

const {HomeController} = require('./controllers/HomeController.js');
const {MarkerController} = require('./controllers/API/MarkerController.js');

router.get('/', HomeController.index);
router.get('/api/markers', MarkerController.index);

exports.router = router;