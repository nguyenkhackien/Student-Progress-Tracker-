const express = require("express")
const router = express.Router()
const { controller1, controller2, addData } = require("../controllers/controller")


router.get( "/monhoc", addData )

module.exports = router
