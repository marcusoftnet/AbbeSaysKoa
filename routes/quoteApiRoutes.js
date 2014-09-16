var parse = require("co-body");
var utils = require("../lib/utils.js");
var db = require("../lib/db.js");
var quotes = db.quotes;
var families = db.families;

module.exports.addQuote = function *() {
	var postedQuote = yield parse(this);

	if(!utils.exists(postedQuote.familyName)){
		this.set("ErrorMessage", "Family name required")
		return this.status = 404;
	};

	var f = yield families.findOne({ name: postedQuote.familyName });

	var quoteToInsert = {
		quoteText : postedQuote.quoteText,
		saidAt : postedQuote.saidAt,
		saidBy : utils.getFamilyMemberByName(f, postedQuote.saidByName),
		family : f,
		tags : utils.splitAndTrimTagString(postedQuote.tagString)
	};
	quoteToInsert.created_at = new Date;

	var q = yield quotes.insert(quoteToInsert);

	this.set("Location", "/api/quote/" + q._id);
	this.status = 200;
};