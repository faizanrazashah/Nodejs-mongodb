// module.exports = app => {
//     const tutorials = require("../controllers/tutorial.controller.js");
//     var router = require("express").Router();

//     //create a new tutorial
//     router.post("/",tutorials.create);

//     //retrieve all tutorials
//     router.get("/",tutorials.findAll);

//     //retrieve all published tutorials
//     router.get("/",tutorials.findAllPublished);

//     //retrieve a single tutorial with id 
//     router.get("/:id",tutorials.findOne);

//     //update a tutorial with id
//     router.put("/:id",tutorials.update);

//     //delete a tutorial with id
//     router.delete("/:id",tutorials.delete);

//     //delete all tutorial
//     router.delete("/",tutorials.deleteAll);

//     app.use('/api/tutorials', router);
// }
const { authJwt } = require("../middlewares");
const controller = require("../controllers/tutorial.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/tut/add", [authJwt.verifyToken], controller.create);

  app.get("/api/tut/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/tut/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/tut/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/tut/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/tut/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};