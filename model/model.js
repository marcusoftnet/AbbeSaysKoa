function Family(familyName){
	this.name = familyName;
	this.members = [];
};

Family.prototype.addFamilyMember = function(name, birthDate){
	if(!name) throw new Error("Name required");
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

function Quote(text, saidAt, family, familyMember, tags) {
	this.quoteText = text;
	this.saidAt = saidAt;
	this.family = family;
	this.familyMember;
	this.tags = tags || [];
};

module.exports.Family = Family;
module.exports.Quote = Quote;