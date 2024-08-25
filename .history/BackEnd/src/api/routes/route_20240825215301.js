const express = require("express")
const router = express.Router()
const {  addData } = require("../controllers/controller")
const {createData} = require("../")

router.get( "/monhoc", addData )

module.exports = router
