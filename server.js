const express = require("express");
const cors = require("cors");
const sequelize = require("sequelize");
// const bodyParser = require("body-parser")
const db = require("./models");
const Role = db.role;

const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
    // initial();
  });

  async function initial() {
    try {
      await Role.create({
        id: 1,
        name: "user"
      });
     
      await Role.create({
        id: 2,
        name: "moderator"
      });
     
      await Role.create({
        id: 3,
        name: "admin"
      });
    } catch(error){
        console.log(error.message);
    }
  }

  require("./routes/auth.routes")(app);
  require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
