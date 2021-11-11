const { authJwt } = require("../middlewares");
const controller = require("../controllers/special_list.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/special/add", [authJwt.verifyToken], controller.create);

  app.get("/api/special/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/special/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/special/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/special/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/special/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};