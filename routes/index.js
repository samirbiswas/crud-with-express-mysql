const router = require("express").Router();

const authRouters = require("./auth.routes");

router.use("/auth", authRouters);

module.exports = router;
