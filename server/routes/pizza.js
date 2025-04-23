const express = require("express");
const router = express.Router();
const pizzaController = require("../controllers/pizza.controller");
const upload = require("../middleware/multerUpload");

// Routes with multer middleware
router.post("/", upload.single("image"), pizzaController.registerPizza);
router.put("/edit/:pizzaId", upload.single("image"), pizzaController.editPizza);

// Other routes
router.get("/getPizzas/:keyword?", pizzaController.getPizzasList);
router.post("/deletePizzas", pizzaController.deletePizzas);
router.get("/:pizzaId", pizzaController.getPizzaDetails);

module.exports = router;
