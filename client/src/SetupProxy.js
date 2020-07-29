// /client/src/setupProxy.js

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy('/api/*', { target: process.env.PORT||'http://localhost:5000'}))
}