const express = require('express');
const path = require('path');
const app = express();
const router = require('./Router.js').router;
const provider = require('./Database/Provider.js').Provider;
require('dotenv').config()
process.env = require('./Configs.js').configs;

const PORT = 8080;

app.use(router);
app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, 'localhost', () => {
    console.log('Server listen at 127.0.0.1:8080');
})