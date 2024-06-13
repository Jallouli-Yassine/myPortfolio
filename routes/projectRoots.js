var express = require('express');
var router = express.Router();
const controller = require("../controller/Controller");


router.post("/addProject", controller.addProject);
router.get("/allProjects", controller.getAllProject);

module.exports = router;
