const { user, cart, product } = require("../../db.js");

// Esta función guarda un producto en el carrito de un usuario
async function saveProductsOnCart(data) {
  const { idUser, productQuantity, idProduct } = data;

  // Verificamos si el usuario existe en la base de datos
  const userExist = await user.findByPk(idUser);
  if (!userExist) {
    throw new Error("The user does not exist");
  }

  // Buscamos el detalle del producto
  const productDetail = await product.findByPk(idProduct);
  if (!productDetail) {
    throw new Error("Product not found");
  }

  // Usamos findOrCreate para buscar o crear el carrito del usuario
  const [existCart, created] = await cart.findOrCreate({
    where: { id_user: idUser },
    defaults: {
      cartProducts: [{ id_product: idProduct, cartQuantity: productQuantity }],
      total: Number(productDetail.price) * productQuantity,
    },
  });

  if (created) {
    // Si el carrito fue creado, retornamos un mensaje de éxito
    return "Shopping cart created and product added successfully";
  } else {
    // Si el carrito ya existía, actualizamos los productos y el total
    let updatedCartProducts = [...existCart.cartProducts];
    const existingProductIndex = updatedCartProducts.findIndex(
      (item) => item.id_product === idProduct
    );

    if (existingProductIndex >= 0) {
      // Si el producto ya está en el carrito, actualizamos la cantidad con la nueva cantidad
      updatedCartProducts[existingProductIndex].cartQuantity = productQuantity;
    } else {
      // Si no, añadimos el producto al carrito
      updatedCartProducts.push({
        id_product: idProduct,
        cartQuantity: productQuantity,
      });
    }

    // Recalculamos el total del carrito
    const productIds = updatedCartProducts.map((item) => item.id_product);
    const productDetails = await product.findAll({
      where: { id_product: productIds },
    });

    const total = updatedCartProducts.reduce((acc, item) => {
      const productDetail = productDetails.find(
        (prod) => prod.id_product === item.id_product
      );
      return acc + Number(productDetail.price) * item.cartQuantity;
    }, 0);

    // Guardamos el carrito actualizado
    existCart.cartProducts = updatedCartProducts;
    existCart.total = total;
    await existCart.save();

    return "Shopping cart updated successfully";
  }
}

module.exports = saveProductsOnCart;