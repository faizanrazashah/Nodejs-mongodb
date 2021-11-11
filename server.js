const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(bodyParser.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.set('view engine', 'ejs');
  
  const db = require("./app/models");
    const Role = db.role;
  
    db.mongoose
    .connect(`mongodb://localhost:27017/faizan_login_db`, {
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    .then(() => {
      console.log("Sucessfully connected to mongodb")
      initial();
    })
    .catch( err =>{
      console.error("Connection error", err);
      process.exit();
    });
  
    function initial() {
      Role.estimatedDocumentCount((err, count) => {
        if(!err&&count===0) {
          new Role({
            name: "user"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
            console.log("add user to roles collection");
          });
          new Role({
            name:"moderator"
          }).save(err => {
            if (err) {
              console.log("error",err);
            }
            console.log("added 'moderator' to roles collection");
          });
          new Role({
            name: "admin"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
          });
        }
      });
    }

  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Hi! Welcome to faizan application." });
  });


  
  // routes
  require('./app/routes/auth.routes')(app);
  require('./app/routes/user.routes')(app);
  require('./app/routes/tutorial.routes')(app);
  require('./app/routes/role.routes')(app);
  require('./app/routes/subs.routes')(app);
  require('./app/routes/cat.routes')(app);
  require('./app/routes/promo.routes')(app);
  require('./app/routes/video.routes')(app);
  require('./app/routes/game.routes')(app);
  require('./app/routes/app.routes')(app);
  require('./app/routes/email.routes')(app);
  require('./app/routes/news.routes')(app);
  require('./app/routes/jazzpay.routes')(app);
  require('./app/routes/gocardless.routes')(app);
  require('./app/routes/image_profile.routes')(app);
  require('./app/routes/home_slider.routes')(app);
  require('./app/routes/special_list.routes')(app);
  require('./app/routes/voucher.routes')(app);
  require('./app/routes/role_permission.routes')(app);

  // set port, listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  