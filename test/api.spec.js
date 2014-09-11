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
			it("requires unique family name");
		});
		describe("Handling family members", function() {
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