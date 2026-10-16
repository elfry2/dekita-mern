const routes = require('express').Router();
const { register, login } = require('./controller');

routes.get('/register', register);
routes.get('/login', login);

module.exports = routes;