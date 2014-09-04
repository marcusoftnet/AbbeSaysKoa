function Family(familyName){
	this.name = familyName;
	this.members = [];
};

Family.prototype.addFamilyMember = function(name, birthDate){
	this.members.push({name: name, birthDate:birthDate});
	return this;
};

Family.prototype.removeFamilyMember = function (familyMemberName) {
	for (var i = 0; i < this.members.length; i++) {
		if(this.members[i].name === familyMemberName) {
			this.members.splice(i, 1);
			break;
		}
	}
	return this;
};

module.exports.Family = Family;