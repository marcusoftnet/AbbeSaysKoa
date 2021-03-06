var koa = require('koa');
var route = require('koa-route');
var app = module.exports = koa();
var config = require('./config')();

// middleware

// routes
// /api/family
var familyApiRoutes = require('./routes/familyApiRoutes.js');
app.use(route.post("/api/family", familyApiRoutes.addFamily));
app.use(route.get("/api/family/:name", familyApiRoutes.getFamily));
app.use(route.put("/api/family/:name", familyApiRoutes.updateFamily));
app.use(route.post("/api/family/:name/members", familyApiRoutes.addFamilyMember));
app.use(route.put("/api/family/:name/members", familyApiRoutes.updateFamilyMember));
app.use(route.del("/api/family/:name/members", familyApiRoutes.removeFamilyMember));

// /api/quote
var quoteApiRoutes = require('./routes/quoteApiRoutes.js');
app.use(route.post("/api/quote", quoteApiRoutes.addQuote));

// listen
app.listen(config.port);
console.log('listening on port '+ config.port);

