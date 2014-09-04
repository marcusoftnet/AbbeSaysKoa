var should = require("should");
var Family = require("../model/model.js").Family;

describe("A family", function () {

	it("has a name", function () {
		var f = new Family("Hammarberg");
		f.name.should.equal("Hammarberg");
	});
	it("has an array of family member", function () {
		var f = new Family("Hammarberg");
		f.members.should.be.empty;
	});
	it("can add family members", function () {
		var f = new Family("Hammarberg")
			.addFamilyMember("Albert", new Date(2008,1,24));
		f.members.length.should.equal(1);
		f.members[0].name.should.equal("Albert");
	});
	it("can remove family members", function () {
		var f = new Family("Hammarberg")
			.addFamilyMember("Albert", new Date(2008,1,24))
			.removeFamilyMember("Albert");
		f.members.length.should.equal(0);
	});
});

