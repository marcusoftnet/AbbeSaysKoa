var testHelpers = require('./testHelpers.js');
var request = testHelpers.request;

describe("The backend API", function(){
	beforeEach(function () { testHelpers.cleanDb(); });

	describe("Families", function() {
		describe("Adding", function () {
			it("adds a new family with all required attributes", function (done) {
				var postData = { name : "Hammarbergs"};

				request
					.post("/api/family")
					.send(postData)
					.expect("location", "/api/family/Hammarbergs")
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
			it("requires an unique family name", function (done) {
				testHelpers.insertFamily("Hammarbergs");

				var postData = { name : "Hammarbergs"};

				request
					.post("/api/family")
					.send(postData)
					.expect("ErrorMessage", "Family name taken")
					.expect(400, done);
			});
		});
		describe("Getting", function () {
			it("for an existing family name", function (done) {
				testHelpers.insertFamily("Hammarbergs");

				request
					.get("/api/family/Hammarbergs")
					.set("Accept", "application/json")
					.expect(/Hammarbergs/)
					.expect(200, done);
			});
			it("returns error for non-existing family name", function (done) {
				request
					.get("/api/family/Hammarbergs")
					.set("Accept", "application/json")
					.expect(404, done);
			});
		});
		describe("Updating", function () {
			it("updates existing family name", function (done) {
				testHelpers.insertFamily("Hammarbergs");

				request
					.put("/api/family/Hammarbergs")
					.send({ name : "Anderssons"})
					.expect("Location", "/api/family/Anderssons")
					.expect(200, done);
			});
			it("requires unique family name", function (done) {
				testHelpers.insertFamily("Anderssons");
				testHelpers.insertFamily("Hammarbergs");

				request
					.put("/api/family/Hammarbergs")
					.send({ name : "Anderssons"})
					.expect("ErrorMessage", "Family name taken")
					.expect(400, done);
			});
		});
		describe("Handling family members", function() {
			var familyMemberPostData = {};

			beforeEach(function (done) {
				testHelpers.insertFamily("Hammarbergs");

				familyMemberPostData = {
					name: "Albert",
					birthdate : new Date(2008, 1, 24),
					bio : "A fun little bloke"};
				done();
			});
			it("adds family members", function (done) {

				request
					.post("/api/family/Hammarbergs/members")
					.send(familyMemberPostData)
					.expect("Location", "/api/family/Hammarbergs")
					.expect(200, done);
			});
			it("requires a name for family members", function (done) {
				delete familyMemberPostData.name;

				request
					.post("/api/family/Hammarberg/members")
					.send(familyMemberPostData)
					.expect("ErrorMessage", "Family members must have a name")
					.expect(400, done);
			});
			it("requires a birthdate for family members", function (done) {
				delete familyMemberPostData.birthdate;

				request
					.post("/api/family/Hammarberg/members")
					.send(familyMemberPostData)
					.expect("ErrorMessage", "Family members must have a birth date")
					.expect(400, done);
			});
			it("changes name for existing family members", function (done) {
				testHelpers.cleanDb();
				testHelpers.insertFamilyWithFamilyMember("Hammarbergs", "Albert");

				var postData = {
					name : "Albert",
					newName : "Abbe",
					newBirthdate : new Date(2008, 1, 24),
					newBio : "Some text"
				};

				request
					.put("/api/family/Hammarbergs/members")
					.send(postData)
					.expect("Location", "/api/family/Hammarbergs")
					.expect(200, done);
			});
			it("changes birthdate for existing family members", function (done) {
				testHelpers.cleanDb();
				testHelpers.insertFamilyWithFamilyMember("Hammarbergs", "Albert");

				var postData = {
					name : "Albert",
					newName : "Abbe",
					newBirthdate : new Date(2008, 1, 24),
					newBio : "Some text"
				};

				request
					.put("/api/family/Hammarbergs/members")
					.send(postData)
					.expect("Location", "/api/family/Hammarbergs")
					.expect(200, done);
			});
			it("changes bio for existing family members", function (done) {
				testHelpers.cleanDb();
				testHelpers.insertFamilyWithFamilyMember("Hammarbergs", "Albert");

				var postData = {
					name : "Albert",
					newName : "Abbe",
					newBirthdate : new Date(2008, 1, 24),
					newBio : "Some text"
				};

				request
					.put("/api/family/Hammarbergs/members")
					.send(postData)
					.expect("Location", "/api/family/Hammarbergs")
					.expect(200, done);
			});
			it("removes existing family members", function (done) {
				testHelpers.cleanDb();
				testHelpers.insertFamilyWithFamilyMember("Hammarbergs", "Albert");
				var postData = { nameToRemove : "Albert" };

				request
					.del("/api/family/Hammarbergs/members")
					.send(postData)
					.expect("Location", "/api/family/Hammarbergs")
					.expect(200, done);
			});
		});
		describe("Remove", function () {
			it("removes all data about a family, including quotes");
		});
	});
	describe("Quotes", function () {
		var testFamily, quotePostData = {};
		beforeEach(function (done) {
			testFamily = testHelpers
					.insertFamilyWithFamilyMember("Hammarbergs", "Albert");

			quotePostData = {
				quoteText : "A quote",
				saidAt : new Date(2014,9,16),
				saidByName : "Albert",
				familyName : "Hammarbergs",
				tagString : "tag1, tag2, tag3"
			};
			done();
		});
		describe("Adding", function () {
			it("add a new quote with all required attributes", function (done) {
				request
					.post("/api/quote")
					.send(quotePostData)
					.expect("location", /^\/api\/quote\/[0-9a-fA-F]{24}$/)  // /api/quote/:id
					.expect(200, done);
			});
			it("requires a family name", function (done) {
				delete quotePostData.familyName;

				request
					.post("/api/quote")
					.send(quotePostData)
					.expect("ErrorMessage", "Family name required")
					.expect(404, done);
			});
			it("requires a family name", function (done) {
				quotePostData.familyName = "The H-bergs";

				request
					.post("/api/quote")
					.send(quotePostData)
					.expect("ErrorMessage", "Could not find family 'The H-bergs'")
					.expect(404, done);
			});
			it("requires a said by name", function (done) {
				delete quotePostData.saidByName;

				request
					.post("/api/quote")
					.send(quotePostData)
					.expect("ErrorMessage", "Said by name required")
					.expect(404, done);
			});
			it("requires a quote text");
			it("requires a said at date");
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