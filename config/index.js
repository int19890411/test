/**
 * Created by roman on 22.10.14.
 */
var nconf = require("nconf");
var path = require("path");

nconf.argv().env();
nconf.file({file: path.join(__dirname, (process.env.NODE_ENV || "production") + '.json')});

module.exports = nconf;