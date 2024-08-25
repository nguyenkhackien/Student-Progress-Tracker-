const xlsx = require("xlsx")
const path = require( "path" )

const filePath = path.join(__dirname, "../../Book1.xlsx")
const workBook = xlsx.readFile(filePath)

const monhoc = workBook.Sheets[ workBook.SheetNames[ 2 ] ]
const data =xlsx.utils.sheet_to_json(monhoc)
console.log(monhoc)
