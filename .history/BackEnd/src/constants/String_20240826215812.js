const insertData2MonHoc = `INSERT INTO MonHoc (MSSV, hoTen, ngaysinh, lop, maLMH, tenMH, nhom, soTC, ghichu)
            VALUES ?`
const insertData2LichHoc = `INSERT INTO LichHoc (maHP, HP, TC, maLMH, soSV, GV, thu, tiet, giangduong, nhom)
            VALUES ?`
const insertData2LichThi = `INSERT INTO LichThi (giothi, thu, ngaythi, maHP, HP, soTC, maLMH, GV, SS, phongthi, HTT)
            VALUES ?`
const insertData2Majors = `INSERT INTO Majors (major_id, major_name)
            VALUES ?`
const insertData2Subjects = `INSERT INTO Subjects (subject_id, subject_name, TC)
            VALUES ?`
const insertData2Groupsubject = `INSERT INTO GroupSubject (group_id, group_name, note)
            VALUES ?`
const insertData2Curriculum = `INSERT INTO Curriculum (subject_id, group_id, major_id)
            VALUES ?`
const insertData2Students = `INSERT INTO Students (MSSV, student_name, major_id, class)
            VALUES ?`
const insertData2StudyProgress = `INSERT INTO StudyProgress (MSSV, subject_id)
            VALUES ?`
module.exports = {
    insertData2MonHoc,
    insertData2LichHoc,
    insertData2LichThi,
    insertData2Majors,
    insertData2Subjects,
    insertData2Groupsubject,
    insertData2Curriculum,
    insertData2Students,
    insertData2StudyProgress,
}
