module.exports = router => {
  router.get("/", ctx => {
    ctx.body = "Please give me timestamp as part of the url";
  });
  router.use("/:query", require("./handleAll"));
  router.get("/*", ctx => {
    ctx.body = "Please give me a valid route";
  });
};
