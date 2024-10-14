const connection = require("../../config/database")

const getSemesterList = async (req, res) => {
    try {
        const [List] = await connection
            .promise()
            .query(`SELECT * FROM Semester`)
        if (List.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Hiện không có dữ liệu kỳ nào",
            })
        }
        res.status(200).json({
            success: true,
            message: "Lấy thông tin thành công",
            List :List
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã có lỗi xảy ra",
            error,
        })
    }
}

module.exports = { getSemesterList }