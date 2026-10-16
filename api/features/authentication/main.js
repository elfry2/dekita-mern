const _middlewares = require('./middlewares');
const urlPrefix = '/user';
const routes = require('./routes');

const middlewares = _middlewares.map(function(middleware) {
    return `middlewares/${middleware}`;
});

module.exports = {
    middlewares,
    urlPrefix,
    routes,
};