require("dotenv").config()
const express = require("express")
const router = require("./api/routes/route")
const app = express()
const port = process.env.PORT //3000
const connection = require("./config/database")

app.use(router)

// get data
connection.query("SELECT * FROM Accounts", function (err, result, fields) {
    console.log("data =>", result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
