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
    const filePath = path.join(__dirname, '../Data.xlsx')
    const workBook = xlsx.readFile( filePath )
    
    const monhoc = w[workBook.SheetNames[0]]
    const lichthi = workBook.SheetNames[1]
    const lichhoc = workBook.SheetNames[2]
}
module.exports = {controller1,controller2,addData}