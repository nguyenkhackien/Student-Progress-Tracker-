const xlsx = require("xlsx")
const path = require("path")
const { insertData2Majors } = require("../../constants/String")
const connection = require("../../config/database")

// function getRandomSubjects(subjects) {
//     const num = Math.floor(Math.random() * subjects.length) + 1
//     const shuffled = subjects.sort(() => 0.5 - Math.random())
//     return shuffled.slice(0, num)
// }
function insertData(data, String, req, res) {
    // res.json(Data)
    console.log(data[0])
    connection.query(
        String,
        [data.map((item) => [Object.values(item)])],
        (err) => {
            res.send(err)
        }
    )
}

const createData = (req, res) => {
    const filePath = path.join(__dirname, "../../Book1.xlsx")
    const workBook = xlsx.readFile(filePath)

    const majors = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[0]]
    )
    const subjects = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[1]]
    )
    const curriculums = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[2]]
    )
    const groupSubjects = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[3]]
    )
    const students = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[4]]
    )
    insertData(majors, insertData2Majors, req, res)
}
module.exports = { createData }
