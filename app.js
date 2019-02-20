const fs = require("fs");
const path = require("path");
// const jsoncsv = require("json-csv");
const stringify = require("csv-stringify");
const csv = require("csvtojson");
const csvFilePath = path.join(__dirname, "data.csv");
// const csvFilePathInternal = path.join(__dirname, "internal.csv");
// const csvFilePathExternal = path.join(__dirname, "external.csv");

var loadData = async () => {
  try {
    let emailJson = await csv().fromFile(csvFilePath);
    // console.log(emailJson);
    return emailJson;
  } catch (error) {
    console.log(error.toString());
  }
};

let writeData = async (internal, external) => {
  //Add more fields Here
  let columns = {
    email: "email",
    name: "name"
  };
  stringify(internal, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile("internal.csv", output, err => {
      if (err) throw err;
      console.log("internal.csv saved.");
    });
  });

  stringify(external, { header: true, columns: columns }, (err, output) => {
    if (err) throw err;
    fs.writeFile("external.csv", output, err => {
      if (err) throw err;
      console.log("external.csv saved.");
    });
  });
};

var segregate = async data => {
  try {
    let internal = [];
    let external = [];
    data.forEach(element => {
      if (!/1[5-8][A-Z]{3}[0-9]{3}[0-9]$/.test(element.regno)) {
        external.push(element);
      } else {
        internal.push(element);
      }
    });
    await writeData(internal, external);
  } catch (error) {
    console.log(error.toString());
  }
};

let main = async () => {
  let data = await loadData();
  console.log("Done");
};
