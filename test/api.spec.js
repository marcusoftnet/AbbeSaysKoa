var testHelpers = require('./testHelpers.js');
var co = require('co');
var request = testHelpers.request;
var Family = require("../model/model.js").Family;

describe("The backend API", function(){
	beforeEach(function (done) {
		testHelpers.cleanDb();
		done();
	});

	describe("Families", function() {
		describe("Adding", function () {
			it("adds a new family with all required attributes", function (done) {
				var postData = {
					name : "Hammarbergs"
				};

				request
					.post("/api/family")
					.send(postData)
					.expect("location", /^\/api\/family\/[0-9a-fA-F]{24}$/)
					.expect(200, done);
			});
			it("requires a family name", function (done) {
				var postData = { };

				request
					.post("/api/family")
					.send(postData)
					.expect("ErrorMessage", "Family name required")
					.expect(400, done);
			});
			it("requires an unique family name");
			it("requires at least one person in the family");
		});
		describe("Getting", function () {
			it("for an existing family name");
			it("returns error for non-existing family name");
		});
		describe("Updating", function () {
			it("updates family names");
			it("requires unique family name");
			it("adds family members");
			it("require a name for family members");
			it("require a birthdate for family members");
			it("changes name for existing family members");
			it("removes existing family members");
		});
		describe("Remove", function () {
			it("removes all data about a family, including quotes");
		});
	});
	describe("Quotes", function () {
		describe("Adding", function () {
			it("add a new quote with all required attributes");
			it("requires a family member reference");
			it("requires a quote");
			it("requires a date");
			it("has tags");
		});
		describe("Updating", function () {
			it("updates the family member reference");
			it("updates the quote text");
			it("updates the date");
		});
		describe("Removing", function () {
			it("removes an existing quote");
		});
		describe("Getting", function () {
			it("get all quotes for a family");
			it("get all quotes for a family paged");
			it("get all quotes for a family member");
			it("get all quotes for a family member paged");
			it("get top 10 quotes for a family");
			it("get top 10 quotes for a family member");
		});
	});
});