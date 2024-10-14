const connection = require("../../config/database")

const getUserSchedule = async (req, res) => {
    const Account = req.query.account
    const semester_id = req.query.semester_id
    try {
        const [Data] = await connection.promise().query(
            `SELECT lh.maLMH,lh.tenMH,lh.Giangvien,lh.thu,lh.tiet,lh.giangduong,lh.nhom,lh.semester_id
            FROM Registration s
            JOIN lichhoc lh ON s.maLMH = lh.maLMH
            WHERE s.mssv = ? and lh.semester_id=?`,
            [Account,semester_id]
        )
        if (Data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hiện không có dữ ",
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

module.exports = { getUserSchedule }
