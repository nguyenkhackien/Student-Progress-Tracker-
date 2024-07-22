const xlsx = require("xlsx")
const path = require("path")
const connection = require("../../config/database")
const { insertData2MonHoc } = require("../../constants/String")
const controller1 = (req, res) => {
    res.send("Hello kien")
}

const controller2 = (req, res) => {
    res.send("controller 2")
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
const addData = (req, res) => {
    const filePath = path.join(__dirname, "../../Data.xlsx")
    const workBook = xlsx.readFile(filePath)

    const monhoc = workBook.Sheets[workBook.SheetNames[0]]
    const lichthi = workBook.Sheets[workBook.SheetNames[1]]
    const lichhoc = workBook.Sheets[workBook.SheetNames[2]]

    
}
module.exports = { controller1, controller2, addData }
