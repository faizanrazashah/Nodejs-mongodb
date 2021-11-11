const { authJwt } = require("../middlewares");
const controller = require("../controllers/voucher.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/voucher/add", [authJwt.verifyToken], controller.create);

  app.get("/api/voucher/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/voucher/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/voucher/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/voucher/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/voucher/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};