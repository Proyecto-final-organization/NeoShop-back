const { user, cart, product } = require("../../db.js");

//Este controller guarda y actualiza los datos del card de un usuario en especifico
async function saveProductsOnCart(data) {
  const { idUser, arrayProducts } = data; // Desestructuramos el form

  // Comprobamos que exista el usuario
  const userExist = await user.findByPk(idUser);
  if (!userExist) {
    throw new Error("The user does not exist");
  }

  // Comprobamos que exista el carrito
  let existCart = await cart.findOne({ where: { id_user: idUser } });

  // Obtener los detalles de los productos incluidos en el carrito (para sumar el total)
  const productsDetails = await product.findAll({
    where: { id_product: arrayProducts },
  });

  if (!productsDetails.length) {
    throw new Error("No valid products found");
  }

  // Calcular el total sumando los precios de los productos
  const total = productsDetails.reduce(
    (acc, prod) => acc + Number(prod.price),
    0
  );

  if (!existCart) {
    // Si no existe el carrito, creamos uno nuevo
    await cart.create({
      id_user: idUser,
      product_id: arrayProducts,
      quantity: arrayProducts.length,
      total: total,
    });
  } else {
    // Si existe, actualizamos los productos y la cantidad
    existCart.product_id = arrayProducts;
    existCart.quantity = arrayProducts.length;
    existCart.total = total;
    await existCart.save();
  }

  return "Shopping cart updated successfully";
}

module.exports = saveProductsOnCart;
