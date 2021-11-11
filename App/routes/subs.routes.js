const { authJwt } = require("../middlewares");
const controller = require("../controllers/subs.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/subs/add", [authJwt.verifyToken], controller.create);

  app.get("/api/subs/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/subs/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/subs/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/subs/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/subs/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};