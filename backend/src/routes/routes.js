const controller = require("../controller/controller");
const express = require("express");
const router = express.Router(); 


router.get("/", controller.getAllData);
router.post("/", controller.postAllData);


module.exports = router