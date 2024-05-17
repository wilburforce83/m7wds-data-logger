const axios = require('axios');
const JSONdb = require("simple-json-db");

// Example data (could be replaced with a database)
const db = new JSONdb("./db/db.json");

// Function to fetch CME data for the past 30 days and store it
async function fetchCMEData() {
    try {
        // Get the current date and 30 days before in UTC format (YYYY-MM-DD)
        const currentDate = new Date().toISOString().split('T')[0];
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        // Make a GET request to DONKI API to retrieve CME data for the past 30 days
        const response = await axios.get(`https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get/CMEAnalysis?startDate=${thirtyDaysAgo}&endDate=${currentDate}&mostAccurateOnly=true&catalog=ALL`);

        // Check if the request was successful
        if (response.status === 200) {
            // Assuming the API returns an array of CME objects
            const cmeData = response.data;

            // Store the fetched CME data in the database
            db.set("cmeData", cmeData);
            
            console.log('CME data for the past 30 days stored successfully.');
        } else {
            console.log('Failed to fetch CME data. Status code: ', response.status);
        }
    } catch (error) {
        console.error('Error fetching CME data: ', error);
    }
}

module.exports = { fetchCMEData };
