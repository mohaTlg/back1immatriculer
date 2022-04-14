const express = require("express");
require("dotenv").config({ path: "./.env" });
require("./config/db");

// import routes
const userRoutes = require("./routes/userRoutes");
const demandeRoutes = require("./routes/demandeRoutes");
const VehiculeApiRoutes = require("./routes/VehiculeApiRoutes");

//cors and body parser
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
var whitelist = [
  "http://localhost:3000",
  "https://immatriculerguinee.herokuapp.com",
];
const corsOptions = {
  // origin: process.env.CLIENT_URL,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type", "x-access-token"],
  exposedHeaders: ["sessionId", "x-access-token"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// define routes
app.use("/api/user", userRoutes);
app.use("/api/demande", demandeRoutes);
app.use("/api/vehicles", VehiculeApiRoutes);
// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
