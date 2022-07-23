const express = require('express');
const router = express.Router();

const { HomeController } = require('./controllers/HomeController.js');
const { NodeController } = require('./controllers/API/NodeController.js');
const { GraphController } = require('./controllers/API/GraphController.js');

router.get('/', HomeController.index);
router.get('/api/node', NodeController.index);
router.post('/api/node', NodeController.insert);
router.delete('/api/node/:id', NodeController.destroy);

router.get('/api/graph', GraphController.index);
router.post('/api/graph', GraphController.insert);
router.post('/api/graph/:id', GraphController.update);
router.delete('/api/graph/:id', GraphController.destroy);

exports.router = router;