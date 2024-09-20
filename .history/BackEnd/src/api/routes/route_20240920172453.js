const express = require("express")
const router = express.Router()
const {createData} = require("../controllers/CreateData")

router.get( "/createData", createData )
router.get("/",(req,res)=> res.send("hello"))
module.exports = router
