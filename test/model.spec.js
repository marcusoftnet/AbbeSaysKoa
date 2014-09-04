var should = require("should");
var Family = require("../model/model.js").Family;
var Quote = require("../model/model.js").Quote;

describe("A family", function () {

	it("has a name", function () {
		new Family("Hammarberg")
			.name.should.equal("Hammarberg");
	});
	it("has an array of family member", function () {
		new Family("Hammarberg")
			.members.should.be.empty;
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
			.removeFamilyMember("Albert")
			.members.length.should.equal(0);
	});
});

describe("A quote", function () {
	var q = null;
	beforeEach(function () {
		var f = new Family("Hammarberg")
					.addFamilyMember("Albert", new Date(2008,1,24));
		q = new Quote("A quote", new Date(2014,9,4), f, f.members[0]);
	})

	it("must have a text", function () {
		q.quoteText.should.equal("A quote");
	});
	it("must have a said-at date", function () {
		q.saidAt.should.empty;
	});
	it("can have tags", function () {
		q.tags.should.be.empty;
	});
	it("has a reference to a family", function () {
		q.family.name.should.equal("Hammarberg");
	});
	it("has a reference to a family member", function () {
		q.family.members[0].name.should.equal("Albert");
	});
})

