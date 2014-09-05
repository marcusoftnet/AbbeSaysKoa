var monk = require("monk");
var wrap = require("co-monk");
var config = require("../config")();
var db = monk(config.mongoUrl);

var families = wrap(db.get("families"));
module.exports.families = families;