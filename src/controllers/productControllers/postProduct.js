const { product } = require('../../db.js');

async function postProduct(data) {
    const {
        name,
        description,
        price,
        quantity,
        img_product,
        available
    } = data;
    
    if (!name || !description || !price || !quantity || !img_product || !available ) {
        throw new Error("Missing data");
    }
    
    const createNewProduct = await product.create({
        name, description, price, quantity, available, img_product 
    });

    return "Product saved successfully";       
}

module.exports = postProduct;