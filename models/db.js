const admin = require("firebase-admin");
require("firebase/storage");
const serviceAccount = require("../appdecornoithat-firebase-adminsdk-996bb-2be16ec66e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://appdecornoithat-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket:"nodejswithfirebase-5b49e.appspot.com"
});
const db = admin;
module.exports = db