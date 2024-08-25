const express = require("express")
const mysql = require("mysql2")

const app = express()
const port = 3000

// Kết nối với cơ sở dữ liệu
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "school_db",
})

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err)
        return
    }
    console.log("Connected to the database")
})

// Hàm sinh dữ liệu ngẫu nhiên
function getRandomSubjects(subjects) {
    const num = Math.floor(Math.random() * subjects.length) + 1 // Sinh số lượng ngẫu nhiên
    const shuffled = subjects.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num)
}

// API endpoint lấy dữ liệu ngẫu nhiên
app.get("/random-subjects", (req, res) => {
    connection.query("SELECT name FROM subjects", (error, results) => {
        if (error) {
            console.error("Error fetching data:", error)
            res.status(500).send("Error fetching data")
            return
        }

        const subjects = results.map((row) => row.name)
        const randomSubjects = getRandomSubjects(subjects)
        res.json(randomSubjects)
    })
})

// Khởi động server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
