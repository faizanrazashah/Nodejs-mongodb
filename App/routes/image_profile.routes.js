const { authJwt } = require("../middlewares");
const controller = require("../controllers/image_profile.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/image/add", [authJwt.verifyToken], controller.create);

  app.get("/api/image/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/image/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/image/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/image/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/image/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};