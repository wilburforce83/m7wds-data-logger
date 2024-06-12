const BMM150 = require('node-bmm150');
const JSONdb = require("simple-json-db");


async function fetchBMM150Data() {
    try {
        const bmm150 = new BMM150(1, 0x13); // Specify the I2C bus and address
        await bmm150.initialize();
        console.log('BMM150 initialized successfully');
        // initialise db
        const db = new JSONdb("./db/uTdb.json");

        // Setup sensor configuration
        bmm150.setOperationMode(BMM150.OP_MODE_NORMAL);
        bmm150.setPresetMode(BMM150.PRESETMODE_HIGHACCURACY);
        bmm150.setRate(BMM150.RATE_10HZ);
        bmm150.setMeasurementXYZ();

        let calibration = db.get('calibration');

        // Get geomagnetic data
        const geomagneticData = bmm150.getGeomagnetic(calibration);


        let array = [];
        if (db.has('geoData')) {
            array = db.get('geoData');
        }
        array.push(geomagneticData)
        db.set('geoData', array)
        return geomagneticData;

    } catch (error) {
        console.error('Error initializing BMM150:', error);
        throw error; // Re-throw the error after logging it
    }
}



module.exports = { fetchBMM150Data };