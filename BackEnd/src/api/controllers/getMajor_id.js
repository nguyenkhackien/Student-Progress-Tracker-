const connection = require("../../config/database")

const getMajor_id = async (req, res) => {
    const Account = req.query.account
    try {
        const [Data] = await connection.promise().query(
            `SELECT major_id FROM Students
                Where MSSV=?`,
            [Account]
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

module.exports = { getMajor_id }
