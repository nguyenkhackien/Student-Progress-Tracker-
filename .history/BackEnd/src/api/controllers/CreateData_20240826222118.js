const xlsx = require("xlsx")
const path = require("path")
const {
    insertData2Majors,
    insertData2Subjects,
    insertData2Curriculum,
    insertData2Groupsubject,
    insertData2Students,
    insertData2StudyProgress,
} = require("../../constants/String")
const connection = require("../../config/database")

function getRandomSubjects(subjects) {
    const num = Math.floor(Math.random() * (subjects.length - 39)) + 40
    const shuffled = subjects.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num).map((item) => item.subject_id)
}

function insertData(data, String, req, res) {
    // res.json(Data)
    console.log(Object.values(data[0]))
    connection.query(
        String,
        [data.map((item) => Object.values(item) || NULL)],
        (err) => {
            res.send(err)
        }
    )
}
function randomSubjectData(students, subjects) {
    const values = students.map((student) => {
        const subject = getRandomSubjects(subjects)
        let string = ""
        subject.map(
            (sub) => (string = string + `('${student.MSSV}',' ${sub}'),`)
        )
    } )
    connection.query(insertData2StudyProgress, string, (err) => {
        res.send(err)
    })
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
    randomSubjectData(students, subjects,req,res)

    // insertData(majors, insertData2Majors, req, res)
    // insertData(subjects, insertData2Subjects, req, res)
    // insertData(groupSubjects, insertData2Groupsubject, req, res)
    // insertData(curriculums, insertData2Curriculum, req, res)
    // insertData(students,insertData2Students,req,res)
}
module.exports = { createData }