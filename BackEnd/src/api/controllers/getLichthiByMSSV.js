const connection = require("../../config/database")

const getLichthiByMSSV = async (req, res) => {
    const Account = req.query.account
    const semester_id = req.query.semester_id
    try {
        const [Data] = await connection.promise().query(
            `SELECT lt.tenMh,lt.maLMH,lt.TC,lt.SS,lt.HTT,lt.Giothi,lt.thu,lt.ngaythi,lt.phongthi,lt.semester_id
            FROM Registration s
            JOIN LichThi lt ON s.maLMH = lt.maLMH
            WHERE s.mssv = ? and lt.semester_id=? `,
            [Account, semester_id]
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

module.exports = { getLichthiByMSSV }