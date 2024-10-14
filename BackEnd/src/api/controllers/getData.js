const connection = require("../../config/database")

const getData = async (req, res) => {
    const semester_id = req.query.semester_id
    try {
        const [Data] = await connection
            .promise()
            .query(
                `SELECT MSSV,hoTen,maLMH,tenMh,nhom,semester_id FROM Registration WHERE semester_id=?`,
                [semester_id]
            )
        if (Data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hiện không có dữ liệu kỳ này",
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

module.exports = { getData }
