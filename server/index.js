const express = require("express");
const dotenv = require("dotenv");
const app = express();

// Dependencies
require("./db");
const cors = require("cors");
dotenv.config({ silent: process.env.NODE_ENV === "production" });

// Middleware
app.use(require("morgan")("tiny")); // Log API method details
app.use(express.json());
// app.use(cors({ "*": true })); // Allow all origins
app.use(cors());
// app.options("*", cors());
app.use(require("./helpers/jwt")()); // Protect API Authentication
// app.use(require("./helpers/errorhandler"));

const port = process.env.PORT || 9090;
app.get("/", (req, res) => {
  console.log("PORT", process.env.PORT);
  res.send(`Server Working!`);
});

// Routes
app.use("/api/pizzas", require("./routes/pizza"));
app.use("/api/users", require("./routes/user"));
app.use("/api/orders", require("./routes/order"));

app.listen(port, () => console.log(`Server is listening on port ${port}`));
