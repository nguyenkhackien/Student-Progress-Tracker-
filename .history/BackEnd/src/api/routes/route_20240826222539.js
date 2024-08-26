const express = require("express")
const router = express.Router()
const {  addData } = require("../controllers/controller")
const {createData} = require("../controllers/CreateData")

router.get( "/monhoc", addData )
router.get( "/createData", createData )
router.get()
module.exports = router