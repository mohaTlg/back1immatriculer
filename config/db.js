const mongoose = require("mongoose");
const { Sequelize } = require("sequelize");
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
  }
);
try {
  sequelize.authenticate();
  console.log("Connecté à la base de données MySQL!");
} catch (error) {
  console.error("Impossible de se connecter, erreur suivante :", error);
}
module.exports = sequelize;
