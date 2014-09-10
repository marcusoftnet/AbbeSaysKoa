var co = require("co");
var Family = require("../model/model.js").Family;
var db = require("../lib/db.js");
var app = require('../index.js');
module.exports.request = require('supertest').agent(app.listen());

module.exports.cleanDb = function () {
	co(function *() {
		yield db.families.remove({});
	})();
};

module.exports.insertFamily = function (name) {
	co(function *() {
		yield db.families.insert(new Family(name));
	})();
};