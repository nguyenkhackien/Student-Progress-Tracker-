
const filePath = path.join( __dirname, "../../Book1.xlsx" )
const workBook = xlsx.readFile(filePath)

const monhoc = workBook.Sheets[workBook.SheetNames[2]]
console.log(monhoc);