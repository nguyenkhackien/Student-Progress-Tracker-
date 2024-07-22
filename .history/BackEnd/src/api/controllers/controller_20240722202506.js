const xlsx = require( 'xlsx' )
const path = require("path")
const connection = require('../../config/database')
const controller1 = ( req, res ) =>
{
    res.send("Hello kien")
}

const controller2 = (req,res)=>{
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

    const hours = Math.floor(total_seconds / (60 * 60))
    const minutes = Math.floor(total_seconds / 60) % 60

    return new Date(
        Date.UTC(
            date_info.getFullYear(),
            date_info.getMonth(),
            date_info.getDate(),
            hours,
            minutes,
            seconds
        )
    )
}
const addData = (req,res)=>{
    const filePath = path.join(__dirname, '../../Data.xlsx')
    const workBook = xlsx.readFile( filePath )
    
    const monhoc = workBook.Sheets[workBook.SheetNames[0]]
    const lichthi = workBook.Sheets[workBook.SheetNames[1]]
    const lichhoc = workBook.Sheets[ workBook.SheetNames[ 2 ] ]
    
    const dataMonhoc = xlsx.utils.sheet_to_json( monhoc )
    dataMonhoc.forEach(row=>{
        if(row['Ngày sinh'] && !isNaN(row[column]) && row[column] > 25569)
    })
    res.json(dataMonhoc)
    var monhocTable = `INSERT INTO MonHoc 
            (
                MSSV, hoTen, ngaysinh, lop, maLMH, tenMH, nhom, soTC, ghichu
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`
}
module.exports = {controller1,controller2,addData}