const { Router } = require("express");
const user = Router();


//Ejemplo
// user.post("/", async (req, res) => {
//   try {
//     const { user_name, email_address, phone_number, password } = req.body;
//     const newUser = await createUser({
//       user_name,
//       email_address,
//       phone_number,
//       password,
//     });
//     res.status(200).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



module.exports = user;
