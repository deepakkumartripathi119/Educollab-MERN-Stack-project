require("dotenv").config({ path: __dirname + '/.env' });
const Firestore = require('@google-cloud/firestore');

const connectDB_fire = async () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 275e54de885a417eae99909c2ba5e718d5a58f48
};

module.exports = connectDB_fire;

