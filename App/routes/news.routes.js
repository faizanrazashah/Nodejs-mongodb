const { authJwt } = require("../middlewares");
const controller = require("../controllers/news.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/news/add", [authJwt.verifyToken], controller.create);

  app.get("/api/news/all",  [authJwt.verifyToken], controller.findAll);

  app.get(
    "/api/news/:id",
    [authJwt.verifyToken],
    controller.findOne
  );

  app.put(
    "/api/news/:id",
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/news/:id",
    [authJwt.verifyToken],
    controller.delete
  );
  app.delete(
    "/api/news/delete",
    [authJwt.verifyToken],
    controller.deleteAll
  );
};