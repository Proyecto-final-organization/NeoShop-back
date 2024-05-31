const { product } = require("../../db.js");
const { Sequelize } = require("sequelize");

// Función para eliminar acentos de una cadena
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Función para buscar productos por nombre utilizando coincidencia difusa
const getProductByName = async (name) => {
    const leven = (await import('leven')).default;

    // Normalizamos el nombre buscado para eliminar tildes y convertirlo a minúsculas
    const loweredName = removeAccents(name.toLowerCase());

    // Primero buscamos productos con el nombre dado utilizando iLike
    const arrayOfProductsOnDB = await product.findAll({
        where: {
            name: {
                [Sequelize.Op.iLike]: `%${loweredName}%`
            }
        }
    });

    if (arrayOfProductsOnDB.length > 0) {
        return arrayOfProductsOnDB;
    }

    // Si no se encuentra por iLike, obtenemos todos los productos de la base de datos
    const allProducts = await product.findAll();

    // Normalizamos los nombres de los productos para eliminar tildes
    const allProductsNormalized = allProducts.map(prod => ({
        ...prod.dataValues,
        normalizedName: removeAccents(prod.name.toLowerCase())
    }));

    const searchWords = loweredName.split(' '); // Separamos el nombre buscado en palabras individuales

    let allFilteredProducts = [];

    allProductsNormalized.forEach(prod => {
        const prodNameWords = prod.normalizedName.split(' '); // Separamos el nombre del producto en palabras
        const matched = searchWords.every(searchWord => 
            prodNameWords.some(prodWord => {
                const distance = leven(searchWord, prodWord);
                return distance <= Math.ceil(searchWord.length * 0.3); // Umbral del 30%
            })
        );

        if (matched) {
            allFilteredProducts.push(prod);
        }
    });

    // Eliminamos duplicados
    const uniqueFilteredProducts = [...new Set(allFilteredProducts.map(prod => prod.id))]
        .map(id => allFilteredProducts.find(prod => prod.id === id));

    // Si no hay resultados, mandamos el mensaje correspondiente
    if (uniqueFilteredProducts.length < 1) {
        throw new Error("No results found");
    }

    return uniqueFilteredProducts;
};

module.exports = getProductByName;

