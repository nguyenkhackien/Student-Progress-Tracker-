const xlsx = require("xlsx")
const path = require("path")
const connection = require("../../config/database")
const {
    insertData2MonHoc,
    insertData2LichHoc,
    insertData2LichThi,
} = require("../../constants/String")

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
    const Data = xlsx.utils.sheet_to_json(data)
    Data.forEach((row) => {
        if (
            row["ngày thi"] &&
            !isNaN(row["ngày thi"]) &&
            row["ngày thi"] > 25569
        ) {
            row["ngày thi"] = serialToDate(
                row["ngày thi"]
            ).toLocaleDateString("en-GB") // convert serial number to Date time
        }
        if (
            row["Ngày sinh "] &&
            !isNaN(row["Ngày sinh "]) &&
            row["Ngày sinh "] > 25569
        ) {
            row["Ngày sinh "] = serialToDate(
                row["Ngày sinh "]
            ).toLocaleDateString("en-GB") // convert serial number to Date time
        }
    } )
    // res.json(Data)
    connection.query(
        String,[
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
            ])],
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
    // insertData(lichthi, insertData2LichThi, req, res)
}
module.exports = {addData }
