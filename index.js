const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const dotenv = require('dotenv');
dotenv.config();
const logger = require("./config/logger");


const app = express();

// db.sequelize.sync().then(function(){
//     console.log('DB connection sucessful.');
//   }, function(err){   
//     console.log(err);  
//  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node-sql CRUD application." });
});

require("./routes/user.routes")(app);

// set port, listen for requests
app.listen(process.env.PORT, () => {
    logger.info("Server is running on port")

  console.log(`Server is running on port ${process.env.PORT}.`);
});