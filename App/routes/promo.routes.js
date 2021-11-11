const { authJwt } = require("../middlewares");
const controller = require("../controllers/promo.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/promo/add", [authJwt.verifyToken], controller.create);

  app.get("/api/promo/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/promo/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/promo/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/promo/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/promo/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};