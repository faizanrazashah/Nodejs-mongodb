const { authJwt } = require("../middlewares");
const controller = require("../controllers/role_permission.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/permission/add", [authJwt.verifyToken], controller.create);

  app.get("/api/permission/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/permission/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/permission/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/permission/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/permission/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};