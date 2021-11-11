const { authJwt } = require("../middlewares");
const controller = require("../controllers/app.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/app/add", [authJwt.verifyToken], controller.create);

  app.get("/api/app/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/app/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/app/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/app/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/app/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};