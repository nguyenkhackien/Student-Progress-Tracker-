require("dotenv").config()
const express = require("express")
const router = require("./api/routes/route")
const app = express()
const port = process.env.PORT //3000
const connection = require("./config/database")
const cors = require( "cors" )
// app.use(cors)

app.use( express.json() )
app.use(router)
// get data
connection.query(
    `SELECT s.MSSV, lh.*
FROM Registration s
JOIN lichhoc lh ON s.maLMH = lh.maLMH
WHERE s.mssv = 20020679`,
    function (err, result, fields) {
        console.log("data =>", result)
    }
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
