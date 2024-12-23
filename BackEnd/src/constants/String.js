const insertData2Registration = `INSERT INTO Registration (MSSV, hoTen, ngaysinh, class, maLMH, tenMH, nhom, soTC, note, semester_id)
            VALUES ?`
const insertData2LichHoc = `INSERT INTO lichhoc (maHP, tenMH, TC, maLMH, soSV, Giangvien, thu, tiet, giangduong, nhom, semester_id)
            VALUES ?`
const insertData2LichThi = `INSERT INTO LichThi (maHP , tenMH, TC, maLMH, Giangvien, SS, HTT, Giothi, thu, ngaythi, phongthi, semester_id)
            VALUES ?`
const insertData2Majors = `INSERT INTO Majors (major_id, major_name)
            VALUES ?`
const insertData2Subjects = `INSERT INTO Subjects (subject_id, subject_name, TC)
            VALUES ?`
const insertData2Groupsubject = `INSERT INTO GroupSubject (group_id, group_name, note)
            VALUES ?`
const insertData2Curriculum = `INSERT INTO Curriculum (subject_id, group_id, major_id,prerequisite)
            VALUES ?`
const insertData2Students = `INSERT INTO Students (MSSV, student_name, birth_date , major_id, class)
            VALUES ?`
const insertData2StudyProgress = `INSERT INTO StudyProgress (MSSV, subject_id, points)
            VALUES ?`
const insertData2GroupSubjectRequirements = `INSERT INTO GroupSubjectRequirements (major_id, group_id, required)
            VALUES ?`
module.exports = {
    insertData2Registration,
    insertData2LichHoc,
    insertData2LichThi,
    insertData2Majors,
    insertData2Subjects,
    insertData2Groupsubject,
    insertData2Curriculum,
    insertData2Students,
    insertData2StudyProgress,
    insertData2GroupSubjectRequirements,
}
