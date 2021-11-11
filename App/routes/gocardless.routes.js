const { authJwt } = require("../middlewares");
const controller = require("../controllers/cardless.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/cardless/add", [authJwt.verifyToken], controller.create);

  app.get("/api/cardless/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/cardless/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/cardless/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/cardless/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/cardless/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};