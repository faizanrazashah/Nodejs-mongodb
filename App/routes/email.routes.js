const { authJwt } = require("../middlewares");
const controller = require("../controllers/email.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/email/add", [authJwt.verifyToken], controller.create);

  app.get("/api/email/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/email/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/email/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/email/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/email/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};