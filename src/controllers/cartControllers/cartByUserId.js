const { cart } = require("../../db.js");

//Este controller trae el card con el id del usuario que le mandes
const cartByUserId = async (idUser) => {
  const cartDetails = await cart.findAll({
    where: { id_user: idUser },
  });

  return cartDetails;
};

module.exports = cartByUserId;
