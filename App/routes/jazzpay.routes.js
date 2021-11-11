const { authJwt } = require("../middlewares");
const controller = require("../controllers/jazzpay.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/jazzpay/add", [authJwt.verifyToken], controller.create);

  app.get("/api/jazzpay/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/jazzpay/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/jazzpay/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/jazzpay/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/jazzpay/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};