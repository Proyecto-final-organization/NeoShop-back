const admin = require("./firebaseAdmin");

const authGoogle = async (token) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        console.log(decodedToken);
        // Aquí puedes buscar o crear al usuario en tu base de datos
        
        return uid;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    authGoogle
};