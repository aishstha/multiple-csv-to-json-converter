import fs from "fs";
import csv from "csvtojson";
import express from "express";
import bodyParser from "body-parser";

const PORT = 8848;

let app = express();

app.set("port", PORT);
app.use(bodyParser.json());

app.listen(app.get("port"), () => {
  console.log(`Server started at port: ${PORT}`);

  convertFile();
});

function convertFile() {
  const testFolder = "./csv/";

  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      let filePath = testFolder + file;
      csv()
        .fromFile(filePath)
        .then(jsonArray => {
          let obj = {};
          obj[file.split(".")[0]] = jsonArray;
          let result = JSON.stringify(obj);
          return result;
        })
        .then(result => {
          fs.writeFile("result.json", result, err => {
            if (err) {
              console.log(err);
            }
            return result;
          });
        })
        .catch(err => console.log(err));
    });
  });
}
