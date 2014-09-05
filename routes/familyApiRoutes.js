var parse = require("co-body");
var families = require("../lib/db.js").families;

module.exports.addFamily = function *() {
	var postedData = yield parse(this);
	postedData.created_at = new Date;

	var family = yield families.insert(postedData);

	this.set("Location", "/api/family/" + family._id);
	this.status = 200;
};