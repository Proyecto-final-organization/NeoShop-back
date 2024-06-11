const { Router } = require("express");
const payingRoutes = Router();
const createOrder = require("../controllers/payingControllers/createOrder");
const captureOrder = require("../controllers/payingControllers/captureOrder");
const postOrder = require("../controllers/payingControllers/postOrder");
const getPaymentById = require("../controllers/payingControllers/getPaymentById");
const getAllPayments = require("../controllers/payingControllers/getAllPayments");

// Capturar una orden
payingRoutes.post("/capture-order/:orderId", async (req, res) => {
  try {
    const { orderID } = req.body;
    // Realiza las verificaciones necesarias
    if (!orderID) {
      return res.status(400).json({ error: "No se proporcionó el orderID" });
    }
    // Si todas las verificaciones pasan, puedes llamar al controlador
    const response = await captureOrder({ orderID });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una orden
payingRoutes.post("/create-order", async (req, res) => {
  try {
    const { intent, purchase_units } = req.body;
    // Realiza las verificaciones necesarias
    if (
      !intent ||
      !purchase_units ||
      !Array.isArray(purchase_units) ||
      purchase_units.length === 0
    ) {
      return res.status(400).json({ error: "Datos de orden inválidos" });
    }
    // Si todas las verificaciones pasan, puedes llamar al controlador
    const response = await createOrder({ intent, purchase_units });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Funcion para postear pagos
payingRoutes.post("/post-order", async (req, res) => {
  try {
    const uuidPattern =
      /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;

    const { id_payment, arrayProducts, id_user, amount, date } = req.body;
    const errors = [];

    // Verifica que no falte nada
    if (!id_payment || !arrayProducts || !id_user || !amount || !date) {
      return res.status(400).json({ error: "Missing data" });
    }

    // Intentar crear un objeto Date a partir de la constante para verificar que sea una fecha
    const parsedDate = new Date(date);
    // Verificar que el objeto Date es válido
    if (!parsedDate instanceof Date && !isNaN(parsedDate)) {
      return res.status(400).json({ error: "Invalid date" });
    }

    // Verifica que id_payment sea un string
    if (typeof id_payment !== "string") {
      errors.push("Invalid id_payment");
    }

    // Verifica que arrayProducts es un array de objetos
    if (
      !Array.isArray(arrayProducts) ||
      !arrayProducts.every((item) => typeof item === "object")
    ) {
      errors.push("arrayProducts must be an array of objects");
    }

    // Verificar los datos dentro de los objetos del array de productos
    arrayProducts.forEach((item) => {
      // Verifica que cada producto tiene la propiedad productQuantity y es un número
      if (
        !item.hasOwnProperty("productQuantity") ||
        typeof item.productQuantity !== "number"
      ) {
        errors.push("Each product must have a numeric productQuantity");
      }

      // Verifica que cada producto tiene la propiedad id_product y es un UUID válido
      if (
        !item.hasOwnProperty("id_product") ||
        !uuidPattern.test(item.id_product)
      ) {
        errors.push("Each product must have a valid id_product UUID");
      }
    });

    // Verifica que amount sea un string
    if (typeof amount !== "string") {
      errors.push("Invalid amount");
    }

    // Valida que id_user sea un UUID válido
    if (!uuidPattern.test(id_user)) {
      errors.push("Invalid id_user. It must be a valid UUID.");
    }

    // Si hay errores, responder con ellos
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Si todas las verificaciones pasan, llama al controlador
    const response = await postOrder({
      id_payment,
      arrayProducts,
      id_user,
      amount,
      date,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Este es para traer una pago por id
payingRoutes.get("/id/:idPayment", async (req, res) => {
  try {
    const { idPayment } = req.params;
    if (typeof idPayment !== "string") {
      return res.status(400).json("IdPayment must be an string");
    }

    //Si idPayment es un UUID valido lo mandamos al controlador para traer la tienda
    const storeData = await getPaymentById({ idPayment });
    return res.status(200).json(storeData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Este es para traer una pago por id
payingRoutes.get("/all", async (req, res) => {
  try {
    const allPayments = await getAllPayments();
    return res.status(200).json(allPayments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
module.exports = payingRoutes;
