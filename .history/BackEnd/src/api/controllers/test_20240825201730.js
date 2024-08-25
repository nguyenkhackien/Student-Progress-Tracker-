const xlsx = require("xlsx")
const path = require( "path" )

const filePath = path.join(__dirname, "../../Book1.xlsx")
const workBook = xlsx.readFile(filePath)

const monhoc = workBook.Sheets[ workBook.SheetNames[ 2 ] ]
const dta = xlsx.utils.sheet_to_json( monhoc )

function getRandomSubjects(subjects) {
    const num = Math.floor(Math.random() * subjects.length) + 1 // Sinh số lượng ngẫu nhiên
    const shuffled = subjects.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, num)
}
console.log(data)
