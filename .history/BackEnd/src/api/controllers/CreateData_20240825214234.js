const xlsx = require("xlsx")
const path = require("path")

const filePath = path.join(__dirname, "../../Book1.xlsx")
const workBook = xlsx.readFile(filePath)

const majors = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]])
const subjects = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[1]])
const curriculums = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[2]])
const groupSubjects = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[3]])
const students = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[4]])
// function getRandomSubjects(subjects) {
//     const num = Math.floor(Math.random() * subjects.length) + 1
//     const shuffled = subjects.sort(() => 0.5 - Math.random())
//     return shuffled.slice(0, num)
// }
function insertData(data, String, req, res) {
    const Data = xlsx.utils.sheet_to_json(data)
    // res.json(Data)
    connection.query(
        String,
        [
            Data.map((item) => [
                item["giờ thi"],
                item["thứ"],
                item["ngày thi"],
                item["mã HP"],
                item["học phần"],
                item["TC"],
                item["mã LHP"],
                item["giảng viên"],
                item["SS"],
                item["phòng thi"],
                item["HTT"],
            ]),
        ],
        (err) => {
            res.send(err)
        }
    )
}