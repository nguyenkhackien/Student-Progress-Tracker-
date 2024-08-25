const insertData2MonHoc = `INSERT INTO MonHoc (MSSV, hoTen, ngaysinh, lop, maLMH, tenMH, nhom, soTC, ghichu)
            VALUES ?`
const insertData2LichHoc = `INSERT INTO LichHoc (maHP, HP, TC, maLMH, soSV, GV, thu, tiet, giangduong, nhom)
            VALUES ?`
const insertData2LichThi = `INSERT INTO LichThi (giothi, thu, ngaythi, maHP, HP, soTC, maLMH, GV, SS, phongthi, HTT)
            VALUES ?`
const insertData2Majors = `INSERT INTO LichThi (major_id, major_name)
            VALUES ?`
module.exports = { insertData2MonHoc, insertData2LichHoc, insertData2LichThi }
