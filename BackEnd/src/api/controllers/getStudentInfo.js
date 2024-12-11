const connection = require("../../config/database")

const getStudentInfo = async (req, res) => {
    const Account = req.query.account
    try {
        const [info] = await connection.promise().query(
            `SELECT * FROM Students
            where MSSV=?`,
            [Account]
        )
        if (info.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Email hoặc tài khoản sai",
            })
        }
        res.status(200).json({
            success: true,
            message: "Lấy thông tin thành công",
            info: info[0],
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã có lỗi xảy ra",
            error,
        })
    }
}

module.exports = { getStudentInfo }
