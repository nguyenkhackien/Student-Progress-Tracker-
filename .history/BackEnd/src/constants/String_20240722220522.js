const insertData2MonHoc = `INSERT INTO MonHoc (MSSV, hoTen, ngaysinh, lop, maLMH, tenMH, nhom, soTC, ghichu)
            VALUES ?`
const insertData2LichHoc = `INSERT INTO MonHoc (maHP, HP, TC, maLMH, soSV, GV, thu, tiet, ghichu)
            VALUES ?`
const insertData2LichThi = `INSERT INTO MonHoc (MSSV, hoTen, ngaysinh, lop, maLMH, tenMH, nhom, soTC, ghichu)
            VALUES ?`
module.exports = {insertData2MonHoc}