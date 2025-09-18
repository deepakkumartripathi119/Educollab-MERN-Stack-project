require("dotenv").config({ path: __dirname + '/.env' });
const Firestore = require('@google-cloud/firestore');

const connectDB_fire = async () => {
    try {
        const db = new Firestore({
            projectId: 'educollab-c5e3e',
            keyFilename: process.env.GOOGLE_APPLICATIONS_CREDENTIALS,
        });
        return db;
    } catch (error) {
        console.error("Firestore Connection Error:", error);
        throw error;
    }
};

module.exports = connectDB_fire;

