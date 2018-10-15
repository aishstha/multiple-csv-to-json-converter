"use strict";

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _csvtojson = require("csvtojson");

var _csvtojson2 = _interopRequireDefault(_csvtojson);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 8848;

var app = (0, _express2.default)();

app.set("port", PORT);
app.use(_bodyParser2.default.json());

app.listen(app.get("port"), function () {
  console.log("Server started at port: " + PORT);

  convertFile();
});

function convertFile() {
  var testFolder = "./csv/";

  _fs2.default.readdir(testFolder, function (err, files) {
    files.forEach(function (file) {
      var filePath = testFolder + file;
      (0, _csvtojson2.default)().fromFile(filePath).then(function (jsonArray) {
        var obj = {};
        obj[file.split(".")[0]] = jsonArray;
        var result = JSON.stringify(obj);
        return result;
      }).then(function (result) {
        _fs2.default.writeFile("result.json", result, function (err) {
          if (err) {
            console.log(err);
          }
          return result;
        });
      }).catch(function (err) {
        return console.log(err);
      });
    });
  });
}