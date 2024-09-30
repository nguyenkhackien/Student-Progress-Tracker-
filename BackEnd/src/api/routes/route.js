const express = require("express")
const router = express.Router()
const { createData } = require("../controllers/CreateData")
const { register } = require("../controllers/Register")
const { Login } = require("../controllers/Login")
const { sendOTP } = require("../controllers/sendOTP")
router.get("/createData", createData)
router.get("/", (req, res) => res.send("hello khac kien !"))
router.post("/register", register)
router.post("/login", Login)
router.post("/sendOTP", sendOTP)

module.exports = router
