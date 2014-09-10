var parse = require("co-body");
var families = require("../lib/db.js").families;

module.exports.addFamily = function *() {
	var postedData = yield parse(this);

	if(!postedData.name){
		this.status = 400;
		return this.set("ErrorMessage", "Family name required");
	};

	var count = yield families.count({name:postedData.name});
	if(count > 0){
		this.status = 400;
		return this.set("ErrorMessage", "Family name taken");
	};

	postedData.created_at = new Date;

	var family = yield families.insert(postedData);

	this.set("Location", "/api/family/" + family._id);
	this.status = 200;
};