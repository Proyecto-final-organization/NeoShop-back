const { Op } = require("sequelize");
const { cart, user } = require("../../db");
const prueba = require("../mailsControllers/prueba");
const cartByUserId = require("./cartByUserId");

const sendReminderCart = async () => {
  try {
    // Obtener todos los carritos que tengan productos
    const cartsWithProducts = await cart.findAll({
      where: {
        cartProducts: { [Op.not]: [] }, // Cart tenga productos
      },
      include: {
        model: user,
        attributes: ["id_user", "email"],
      },
    });

    for (const cartInstance of cartsWithProducts) {
      const emailUser = cartInstance.user.email;
      const cartFind = await cartByUserId(cartInstance.user.id_user);
      const productSend = cartFind.products;
      const messageSend = `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #5f9ea0;">Hola, tienes productos en tu carrito de NeoShop</h2>
            <p>Estos son los productos que tienes pendientes de compra:</p>
            <ul style="list-style: none; padding: 0;">
              ${productSend
                .map(
                  (item) => `
                <li style="margin-bottom: 10px; display: flex; align-items: center;">
                  <img src="${item.img_product[0]}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                  <span>${item.name} - Cantidad: ${item.cartQuantity} - Precio: $${item.price}</span>
                </li>
              `
                )
                .join("")}
            </ul>
            <p>No olvides finalizar tu compra!</p>
            <p>Para seguir con la compra, por favor <a href="http://localhost:5173/payPreview" style="color: #5f9ea0; text-decoration: none;">da click aquí</a>.</p>
            <p>Gracias por confiar en NeoShop.</p>
          </div>
        `;
      await prueba(emailUser, messageSend);
    }
  } catch (error) {
    console.error(`Error fetching carts: ${error.message}`);
  }
};

module.exports = sendReminderCart;
