var express = require('express');
var router = express.Router();
const controller = require("../controller/Controller");
const upload = require('../config/multer');


router.post("/addProject",upload.single('image') ,controller.addProject);
router.get("/allProjects", controller.getAllProject);

module.exports = router;
