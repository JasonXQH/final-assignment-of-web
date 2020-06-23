const express = require("express");
const router = express.Router();
const { catchErrors } = require("../middleware/error-handlers");
const { authAdmin } = require("../middleware/auth-handlers");
const jwt = require("express-jwt");
const { scrects } = require("../../config");

const {
  register,
  login,
  findAll,
  getInfo,
  delete: del,
} = require("../controllers/user");
const auth = jwt({ secret: scrects });

// user api
router.post("/login", login); // api/users/login
router.post("/register", catchErrors(register)); //api/users/register
router.get("/info", auth, getInfo); // api/users/info
// admin api
router.get("/list", auth, authAdmin, findAll); //api/users/list
router.post("/:id/delete", auth, authAdmin, del);

module.exports = router;
