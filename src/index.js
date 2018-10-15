import fs from "fs";
import csv from "csvtojson";
import express from "express";
import bodyParser from "body-parser";
import async from "async";

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

  let obj = {};
  let filePath = "";

  async.each(
    files,
    (file, callback) => {
      filePath = testFolder + file;
      csv()
      .fromFile(filePath)
      .then(jsonArray => {
        
        obj[file.split(".")[0]] = jsonArray;
        callback(null);
      })
      .catch(err => {
        console.log("Some error is ", err)
        callback("Error is reading")
      });
    },
    (error) => {
      if(error)
        console.log("Some error in reading files ", error);
      else{
        fs.writeFile("result.json", JSON.stringify(obj), err => {
          if (err) {
            console.log("Error in final write file ", err);
          }
          console.log("Successfully converted file. Please check result.json file... Thank you")
        });
      }
    }
  );
  });
}
