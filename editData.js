const JSONdb = require("simple-json-db");
const db = new JSONdb('./db/uTdb.json');

// Sample array of objects with geoData property
const dataArray = db.get('geoData')

// Function to subtract 55 from each x value in geoData
function adjustGeoData(array) {
    array.forEach(obj => {
        if (obj && typeof obj.x === 'number') {
            obj.x -= 55;
        }
    });
}

// Adjust the geoData in the sample array
adjustGeoData(dataArray);

// Log the adjusted array to the console
db.set("geoData",dataArray);
