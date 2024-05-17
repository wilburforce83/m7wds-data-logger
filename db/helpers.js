const JSONdb = require("simple-json-db");

// Initialize the database
const db = new JSONdb("data.json");


const dbhelper = {
// Function to add a value to an array stored in the database under a given key
addValueToArray: (key, value, maxArrayLength) => {
    // Retrieve the current array from the database
    let array = db.get(key) || [];

    // Add the new value to the array
    array.push(value);

    // Check if the maxArrayLength argument is provided and valid
    if (typeof maxArrayLength === 'number' && maxArrayLength > 0) {
        // Check if the array length exceeds the maximum array length
        if (array.length > maxArrayLength) {
            // If so, remove the oldest element(s)
            const removeCount = array.length - maxArrayLength;
            array = array.slice(removeCount);
        }
    }

    // Save the updated array back to the database
    db.set(key, array);

    console.log(`Added ${value} to array under key ${key}`);
},

// Function to return the latest value of a key - this helper will automatically return the latest value even if the value is an array
returnLatestVal: (key) => {
    // Retrieve the value from the database
    const value = db.get(key);

    // Check if the value is an array
    if (Array.isArray(value)) {
        // If it's an array, return the last element
        return value[value.length - 1];
    } else {
        // If it's not an array, return the value as is
        return value;
    }
}

};

module.exports = dbhelper;