var co = require("co");
var db = require("../lib/db.js");
var app = require('../index.js');
module.exports.request = require('supertest').agent(app.listen());

module.exports.cleanDb = function () {
	co(function *() {
		yield db.families.remove({});
	})();
};