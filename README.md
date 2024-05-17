
# Simple API Boilerplate

This is a basic boilerplate for creating a simple API using Node.js and Express. It includes a protected route with an API key and a sample non-protected route. The repository is intended to be used as a template for creating new projects.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/wilburforce83/simple-api-boilerplate.git
   ```

2. Navigate into the cloned directory:

   ```bash
   cd simple-api-boilerplate
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables to the `.env` file:

   ```
   PORT=3000
   API_KEY=your_api_key_here
   ```

   Replace `your_api_key_here` with your desired API key.

3. Ensure to add the `.env` file to `.gitignore` to prevent sensitive information from being committed to version control.

## Usage

### Starting the Server

To start the server, run:

```bash
npm start
```

### Routes

- **Unprotected Route:** 
  - URL: `/data`
  - Method: `GET`
  - Description: Retrieve all data stored in `/db/db.json` (unprotected).
  - Note: This route is currently commented out in `server.js`.

- **Protected Route:** 
  - URL: `/auth/data`
  - Method: `GET`
  - Description: Retrieve data with API key protection.
  - API Key Required: Yes

## File Structure

- **`server.js`:** Main entry point of the application.
- **`db/`:** Folder containing the JSON database file (`db.json`).
- **`example/`:** Folder containing an HTML page with examples of how to request data from the API.

## Notes

- This repository is a public template and can be used and modified freely.
- The API key is required for accessing protected routes.
- The file `/b/db.json` contains a large object of demo data sourced from https://github.com/json-iterator/test-data/blob/master/large-file.json for you to play around with until you have your own data to work with.

## License

This project is licensed under the GNU General Public License v2.0 (GNU GPLv2) - see the [LICENSE](LICENSE) file for details.

