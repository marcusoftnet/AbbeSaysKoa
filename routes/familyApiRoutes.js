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

	if(!postedData.name){
		this.set("ErrorMessage", "Family members must have a name");
		return this.status = 400;
	}

	if(!postedData.birthdate){
		this.set("ErrorMessage", "Family members must have a birth date");
		return this.status = 400;
	}

	var family = yield families.findAndModify(
			{
				query: { name : familyName },
				$push: { members : postedData }
			});

	this.set("Location", "/api/family/" + familyName)
	this.status = 200;
};

module.exports.updateFamilyMember = function *(familyName) {
	var postedData = yield parse(this);

	var f = yield families.findOne({ name : familyName});
	f.members.splice(indexOfFamilyMember(f, postedData.name), 1);
	f.members.push({ name: postedData.newName, birthdate : postedData.birthdate});

	yield families.update({ name : familyName}, { members : f.members });

	this.set("Location", "/api/family/" + familyName)
	this.status = 200;
};

var indexOfFamilyMember = function (family, name) {
	for (var i = 0; i < family.members.length; i++) {
		if(family.members[i].name === name)
			return i;
	};
	return -1;
}