const { authJwt } = require("../middlewares");
const controller = require("../controllers/game.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/game/add", [authJwt.verifyToken], controller.create);

  app.get("/api/game/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/game/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/game/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/game/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/game/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};