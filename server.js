const express = require("express");
const router = require("./routes/");
const session = require("express-session");
require("dotenv").config();
const database = require("./config/database");
const Sequelize = require("sequelize");
const Movimiento = require("./models/Movimiento");
const Usuario = require("./models/Usuario");

var SequelizeStore = require("connect-session-sequelize")(session.Store);

const store = new SequelizeStore({
    db: database
})

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret:process.env.FRASE,
        store:store,
        resave:false,
        saveUninitialized:false,
        proxy:true
    })
)
store.sync()

Movimiento.belongsTo(Usuario)
Usuario.hasMany(Movimiento, {onDelete: 'CASCADE'})

database.sync().then(() => {
  app.use("/", router);
  app.listen(4000, () => console.log("Server listening"));
});