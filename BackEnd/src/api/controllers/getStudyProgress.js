const connection = require("../../config/database")

const getStudyProgress = async (req, res) => {
    const MSSV = req.query.account
    try {
        const [Data] = await connection.promise().query(
            `SELECT sp.subject_id,s.subject_name,s.TC,sp.points,sp.grade,sp.points_4,sp.semester_id FROM StudyProgress sp
            join Subjects s ON sp.subject_id = s.subject_id
            where MSSV = ?
            order by semester_id`,
            [MSSV]
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

module.exports = { getStudyProgress }
