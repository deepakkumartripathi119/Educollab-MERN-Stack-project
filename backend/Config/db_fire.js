require("dotenv").config({ path: __dirname + '/.env' });
const Firestore = require('@google-cloud/firestore');

const connectDB_fire = async () => {
    try {
        let credentials;
        if (process.env.GOOGLE_APPLICATIONS_CREDENTIALS_JSON) {
            credentials = JSON.parse(process.env.GOOGLE_APPLICATIONS_CREDENTIALS_JSON);
        } else if (process.env.GOOGLE_APPLICATIONS_CREDENTIALS) {
            // fallback to file for local/dev
            credentials = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
        } else {
            throw new Error('No Google credentials found in environment');
        }
        const db = new Firestore({
            projectId: credentials.project_id,
            credentials: {
                client_email: credentials.client_email,
                private_key: credentials.private_key
            }
        });
        return db;
    } catch (error) {
        console.error("Firestore Connection Error:", error);
        throw error;
    }
};

module.exports = connectDB_fire;

