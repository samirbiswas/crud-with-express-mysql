const router = require("express").Router();

const { postController } = require("../controllers/auth");

router.post("/signup", postController.signupUser);

module.exports = router;
