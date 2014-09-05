var app = require('../index.js');
module.exports.request = require('supertest').agent(app.listen());