const path = require('path');
exports.configs = {
    PORT: 8080,
    APP_URL: 'localhost:' + this.PORT,

    PROJECT_PATH: __dirname,
    PUBLIC_PATH: path.join(__dirname, 'public/'),
    VIEWS_PATH: path.join(__dirname, 'views/'),
    CONTROLLERS_PATH: path.join(__dirname, 'controllers/'),

    DB_SERVER: "127.0.0.1:27017",
    DB_NAME: "TEST_PROJECT",
}