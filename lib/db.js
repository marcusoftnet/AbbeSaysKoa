var monk = require("monk");
var wrap = require("co-monk");
var config = require("../config")();
var db = monk(config.mongoUrl);

module.exports.families = wrap(db.get("families"));
module.exports.quotes = wrap(db.get("quotes"));
