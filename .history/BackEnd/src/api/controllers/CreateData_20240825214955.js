const xlsx = require("xlsx")
const path = require("path")


// function getRandomSubjects(subjects) {
//     const num = Math.floor(Math.random() * subjects.length) + 1
//     const shuffled = subjects.sort(() => 0.5 - Math.random())
//     return shuffled.slice(0, num)
// }
function insertData(data, String, req, res) {
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

const addData = (req, res) => {
    const filePath = path.join(__dirname, "../../Data.xlsx")
    const workBook = xlsx.readFile(filePath)

    const monhoc = workBook.Sheets[workBook.SheetNames[0]]
    const lichthi = workBook.Sheets[workBook.SheetNames[1]]
    const lichhoc = workBook.Sheets[workBook.SheetNames[2]]
    // insertData(monhoc,insertData2MonHoc,req,res)
    // insertData(lichhoc, insertData2LichHoc, req, res)
    insertData(lichthi, insertData2LichThi, req, res)
}