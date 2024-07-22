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

    const dataMonhoc = xlsx.utils.sheet_to_json(monhoc)
    dataMonhoc.forEach((row) => {
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
    const promisePool =connection.pro
    try {
    const connection = await promisePool.getConnection();
    await connection.beginTransaction(); // Bắt đầu transaction

    // Lưu dữ liệu vào cơ sở dữ liệu
    for (const row of jsonData) {
      await connection.query('INSERT INTO your_table_name SET ?', [row]);
    }

    await connection.commit(); // Commit transaction
    connection.release(); // Trả lại kết nối cho pool
    res.send('Data has been read from Excel and inserted into the database.');
  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).send('Error inserting data into database.');
  }
}
module.exports = { controller1, controller2, addData }
