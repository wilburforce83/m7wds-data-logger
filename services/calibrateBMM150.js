const BMM150 = require('node-bmm150');
const JSONdb = require("simple-json-db");


async function calibrateBMM150() {
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

        let calibration;

        console.log(`starting 5 minutes calibration process. Please wait...`);
        calibration = await bmm150.selfCalibration(5);
        console.log('calibration response;', calibration);
        db.set('calibration',calibration);
        return calibration;

    } catch (error) {
        console.error('Error calibrating BMM150:', error);
        throw error; // Re-throw the error after logging it
    }
}



module.exports = { calibrateBMM150 };