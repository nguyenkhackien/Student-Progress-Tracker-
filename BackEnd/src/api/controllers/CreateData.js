const xlsx = require("xlsx")
const path = require("path")
const {
    insertData2Majors,
    insertData2Subjects,
    insertData2Curriculum,
    insertData2Groupsubject,
    insertData2Students,
    insertData2StudyProgress,
    insertData2Registration,
    insertData2LichThi,
    insertData2LichHoc,
    insertData2GroupSubjectRequirements,
} = require("../../constants/String")
const connection = require("../../config/database")

function getRandomSubjects(subjects) {
    const minSubjects = 10
    const maxSubjects = 40
    const totalSubjects = subjects.length
    const num =
        Math.floor(
            Math.random() *
                (Math.min(maxSubjects, totalSubjects) - minSubjects + 1)
        ) + minSubjects

    const shuffled = subjects.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num).map((item) => item.subject_id)
}

function serialToDate(serial) {
    const utc_days = Math.floor(serial - 25569)
    const utc_value = utc_days * 86400
    const date_info = new Date(utc_value * 1000)

    const fractional_day = serial - Math.floor(serial) + 0.0000001
    let total_seconds = Math.floor(86400 * fractional_day)

    const seconds = total_seconds % 60
    total_seconds -= seconds

    return new Date(
        Date.UTC(
            date_info.getFullYear(),
            date_info.getMonth(),
            date_info.getDate()
        )
    )
}

function insertData(data, String, req, res) {
    // res.json(Data)
    data.forEach((row) => {
        if (
            row["Ngày sinh"] &&
            !isNaN(row["Ngày sinh"]) &&
            row["Ngày sinh"] > 25569
        ) {
            row["Ngày sinh"] = serialToDate(
                row["Ngày sinh"]
            ).toLocaleDateString("en-GB") // convert serial number to Date time
        }
    })
    data.forEach((row) => {
        if (
            row["Ngày thi"] &&
            !isNaN(row["Ngày thi"]) &&
            row["Ngày thi"] > 25569
        ) {
            row["Ngày thi"] = serialToDate(row["Ngày thi"]).toLocaleDateString(
                "en-GB"
            ) // convert serial number to Date time
        }
    })
    connection.query(
        String,
        [data.map((item) => Object.values(item) || NULL)],
        (err) => {
            res.send(err)
        }
    )
}
function randomSubjectData(students, subjects, req, res) {
    const values = students.flatMap((student) => {
        const subject = getRandomSubjects(subjects)
        return subject.map((sub) => [
            student.MSSV,
            sub,
            Math.floor(Math.random() * 100) / 10,
        ])
    })
    console.log(values)
    connection.query(insertData2StudyProgress, [values], (err) => {
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
        workBook.Sheets[workBook.SheetNames[2]],
        { defval: null }
    )
    const groupSubjects = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[3]]
    )
    const students = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[4]]
    )

    const registration = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[6]]
    )
    const lichthi = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[7]],
        { defval: null }
    )
    const lichhoc = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[8]]
    )
    const required = xlsx.utils.sheet_to_json(
        workBook.Sheets[workBook.SheetNames[9]]
    )
    // insertData(required, insertData2GroupSubjectRequirements, req, res)
    randomSubjectData(students, curriculums, req, res)
    // insertData(lichhoc, insertData2LichHoc, req, res)
    // insertData( lichthi, insertData2LichThi, req, res )
    // insertData(registration,insertData2Registration,req,res)
    // insertData(subjects, insertData2Subjects, req, res)
    // insertData(groupSubjects, insertData2Groupsubject, req, res)
    // insertData(curriculums, insertData2Curriculum, req, res)
}
module.exports = { createData }
