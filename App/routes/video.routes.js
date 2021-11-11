const { authJwt } = require("../middlewares");
const controller = require("../controllers/video.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/video/add", [authJwt.verifyToken], controller.create);

  app.get("/api/video/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/video/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/video/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/video/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/video/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};