var express = require('express');
var router = express.Router();
const controller = require("../controller/Controller");


router.post("/addSkill", controller.addSkill);
router.get("/allSkills", controller.getAllSkills);
router.get("/getImageOptions", controller.getSkillsImageOptions);

module.exports = router;
