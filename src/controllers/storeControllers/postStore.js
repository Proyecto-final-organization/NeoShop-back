const { store } = require('../../db.js');

async function postStore(data) {
    const {
        address_cp,
        address_country,
        address_city,
        name
    } = data;

    if (!address_cp && !address_country && !address_city && !name ) {
        throw new Error("Missing data");
    }

    const createNewStore = await store.create({
        name, address_cp, address_country, address_city 
    });

    return ("Product saved successfully", createNewStore);       

}

module.exports = postStore;