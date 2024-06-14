const admin = require('firebase-admin');
const serviceAccount = require("../../../neoshop-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://neoshop-db8af.firebaseio.com'
});

module.exports = admin;
