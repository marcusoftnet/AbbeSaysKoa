var koa = require('koa');
var route = require('koa-route');
var app = module.exports = koa();
var config = require('./config')();

// middleware

// routes
// /api/family
var familyApiRoutes = require('./routes/familyApiRoutes.js');
app.use(route.post("/api/family", familyApiRoutes.addFamily))

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);

