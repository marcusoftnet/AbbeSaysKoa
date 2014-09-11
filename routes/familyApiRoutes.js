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

	this.set("Location", "/api/family/" + family.name);
	this.status = 200;
};

module.exports.getFamily = function *(familyName) {
	var family = yield families.findOne({name: familyName});

	if(!family){ return this.status = 404; }

	this.body = family;
	this.status = 200;
};

module.exports.updateFamily = function *(familyName) {
	var postedData = yield parse(this);

	var count = yield families.count({name:postedData.name});
	if(count > 0){
		this.status = 400;
		return this.set("ErrorMessage", "Family name taken");
	};

	var family = yield families.findAndModify({
				query: { name : familyName },
				$set:  { name : postedData.name }
			});

	this.set("Location", "/api/family/" + postedData.name)
	this.status = 200;
};

module.exports.addFamilyMember = function *(familyName) {
	var postedData = yield parse(this);

	var family = yield families.findAndModify(
			{
				query: { name : familyName },
				$push: { members : postedData }
			});

	this.status = 200;
};