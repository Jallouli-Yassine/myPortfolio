var express = require('express');
var router = express.Router();
const controller = require("../controller/Controller");


router.post("/addTestimonials", controller.addTestimonial);
router.get("/allTestimonials", controller.allTestimonials);

module.exports = router;
