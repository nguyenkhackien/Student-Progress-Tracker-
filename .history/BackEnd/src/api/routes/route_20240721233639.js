const express = require("express")
const router = express.Router()
const { controller1, controller2, readData } = require("../controllers/controller")

router.get("/", controller1)
router.get( "/v2", controller2)
router.post("/read-data",readData)
module.exports = router
