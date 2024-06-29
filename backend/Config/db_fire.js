require("dotenv").config({ path: __dirname + '/.env' });
const Firestore = require('@google-cloud/firestore');

const connectDB_fire = async () => {
    let db;
    try {
        db = new Firestore({
            projectId: 'edu-colab-kriti',
            keyFilename: process.env.GOOGLE_APPLICATIONS_CREDENTIALS,
        });
        console.log(`Firestore Connected`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }

    return db;
};

module.exports = connectDB_fire;

