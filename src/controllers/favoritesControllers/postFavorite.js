const { user, favorites, product } = require("../../db.js");

const postFavorite = async (id_product, id_user) => {
    try {
        const theUser = await user.findByPk(id_user);
        if(!theUser) throw new Error("User not found");
        const theProduct = await product.findByPk(id_product);
        if(!theProduct) throw new Error("Product not found");

        await favorites.create({
            id_product,
            id_user
        });
        return {message: "Favorite save"};
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = postFavorite;