const { authJwt } = require("../middlewares");
const controller = require("../controllers/home_slider.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/slider/add", [authJwt.verifyToken], controller.create);

  app.get("/api/slider/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/slider/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/slider/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/slider/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/slider/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};