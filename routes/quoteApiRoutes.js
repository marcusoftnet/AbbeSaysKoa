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

	if(!utils.exists(postedQuote.saidByName)){
		this.set("ErrorMessage", "Said by name required")
		return this.status = 404;
	};

	if(!utils.exists(postedQuote.quoteText)){
		this.set("ErrorMessage", "Quote text required")
		return this.status = 404;
	};

	var f = yield families.findOne({ name: postedQuote.familyName });

	if(!utils.exists(f)){
		this.set("ErrorMessage", "Could not find family '" + postedQuote.familyName + "'");
		return this.status = 404;
	};

	var saidBy = utils.getFamilyMemberByName(f, postedQuote.saidByName);
	if(!utils.exists(saidBy)){
		this.set("ErrorMessage",
			"'" + postedQuote.saidByName + "' not found in family '"
			+ postedQuote.familyName + "'");
		return this.status = 404;
	};

	var quoteToInsert = {
		quoteText : postedQuote.quoteText,
		saidAt : postedQuote.saidAt,
		saidBy : saidBy,
		family : f,
		tags : utils.splitAndTrimTagString(postedQuote.tagString)
	};
	quoteToInsert.created_at = new Date;

	var q = yield quotes.insert(quoteToInsert);

	this.set("Location", "/api/quote/" + q._id);
	this.status = 200;
};