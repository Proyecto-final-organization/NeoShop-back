const { user, payment } = require("../../db.js");

async function postOrder(data) {
  const { id_payment, arrayProducts, id_user, amount, date } = data;
  const userExist = await user.findByPk(id_user);

  if (!userExist) {
    throw new Error("The user does not exist");
  }

  const createNewPayment = await payment.create({
    id_payment,
    paymentProducts: arrayProducts,
    amount,
    date,
  });

  await userExist.addPayment(createNewPayment);

  return { message: "Payment saved successfully", payment: createNewPayment };
}

module.exports = postOrder;
