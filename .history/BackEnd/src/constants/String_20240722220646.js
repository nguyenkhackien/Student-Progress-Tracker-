const insertData2MonHoc = `INSERT INTO MonHoc (MSSV, hoTen, ngaysinh, lop, maLMH, tenMH, nhom, soTC, ghichu)
            VALUES ?`
const insertData2LichHoc = `INSERT INTO MonHoc (maHP, HP, TC, maLMH, soSV, GV, thu, tiet, giangduong, nhom)
            VALUES ?`
const insertData2LichThi = `INSERT INTO MonHoc (giothi, thu, ngaythi, maHP, HP, soTC, maLMH, GV, ghichu)
            VALUES ?`
module.exports = {insertData2MonHoc}