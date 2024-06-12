// data aquisition functions for adding and manipulating data in db.json

require("dotenv").config();
const JSONdb = require("simple-json-db");
// Example data (could be replaced with a database)
const db = new JSONdb("./db/db.json");
const dbhelper = require("../db/helpers");
const { fetchCMEData } = require("./cmeData");
const { fetchBMM150Data } = require("./uTdata");

function services () {
  //trigger your data aquisition events here and save them to the /db/db.json file with simple-json-db
  // Call fetchCMEData initially and then every 5 minutes
  fetchCMEData();
  fetchBMM150Data();
  setInterval(fetchCMEData, 300000);
  setInterval(fetchBMM150Data, 10000);
};

module.exports = { services };
