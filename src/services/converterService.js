import csv from "csvtojson";

import User from "../models/user";
import fs from "fs";

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function convertToJson() {
  return User.fetchAll();
}

export async function convertCSVtoJson() {
  let csvFilePath = "/home/lf/Desktop/user.csv";
  try {
    let jsonArray = await csv().fromFile(csvFilePath);
    var userList = { users: jsonArray };
    var json = JSON.stringify(userList);

    fs.writeFile("db.json", json, err => {
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
