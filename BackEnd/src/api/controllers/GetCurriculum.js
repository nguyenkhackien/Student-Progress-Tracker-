const connection = require("../../config/database")

const getCurriculum = async (req, res) => {
    const major_id = req.query.major_id
    try {
        const [Data] = await connection.promise().query(
            `SELECT m.major_name,s1.subject_id,s1.subject_name,s1.TC,gs.group_id,gs.group_name,gs.note,c.prerequisite FROM Curriculum c
            join Majors m ON c.major_id = m.major_id
            join Subjects s1 ON s1.subject_id = c.subject_id
            join GroupSubject gs ON gs.group_id=c.group_id
            left join Subjects s2 ON s2.subject_id = c.prerequisite
            where c.major_id=?`,
            [major_id]
        )
        if (Data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hiện không có dữ liệu",
            })
        }
        res.status(200).json({
            success: true,
            message: "Lấy thông tin thành công",
            Data: Data,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã có lỗi xảy ra",
            error,
        })
    }
}

module.exports = { getCurriculum }
