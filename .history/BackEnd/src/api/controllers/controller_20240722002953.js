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

const addData = (req,res)=>{
    const filePath = path.join(__dirname, '../../Data.xlsx')
    const workBook = xlsx.readFile( filePath )
    
    const monhoc = workBook.Sheets[workBook.SheetNames[0]]
    const lichthi = workBook.Sheets[workBook.SheetNames[1]]
    const lichhoc = workBook.Sheets[ workBook.SheetNames[ 2 ] ]
    
    const dataMonhoc = xlsx.utils.sheet_to_json( monhoc )
    var sql = `INSERT INTO MonHoc 
            (
                MSSV, hoTen, ngaysinh, lop, maLMH, tenMH,nhom
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?
            )`
}
module.exports = {controller1,controller2,addData}