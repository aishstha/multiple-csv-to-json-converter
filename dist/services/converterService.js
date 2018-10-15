"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToJson = convertToJson;
exports.convertCSVtoJson = convertCSVtoJson;

var _csvtojson = require("csvtojson");

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _user = require("../models/user");

var _user2 = _interopRequireDefault(_user);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get all users.
 *
 * @return {Promise}
 */
function convertToJson() {
  return _user2.default.fetchAll();
}

async function convertCSVtoJson() {
  var csvFilePath = "/home/lf/Desktop/user.csv";
  try {
    var jsonArray = await (0, _csvtojson2.default)().fromFile(csvFilePath);
    var userList = { users: jsonArray };
    var json = JSON.stringify(userList);

    _fs2.default.writeFile("db.json", json, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });

    return jsonArray;
  } catch (err) {
    throw err;
  }
}