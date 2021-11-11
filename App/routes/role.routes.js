const { authJwt } = require("../middlewares");
const controller = require("../controllers/role.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/role/add", [authJwt.verifyToken], controller.create);

  app.get("/api/role/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/role/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/role/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/role/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/role/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};