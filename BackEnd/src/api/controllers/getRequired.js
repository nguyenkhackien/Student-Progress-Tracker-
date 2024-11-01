const connection = require("../../config/database")

const getRequired = async (req, res) => {
    const major_id = req.query.major_id
    try {
        const [Data] = await connection
            .promise()
            .query( `SELECT * FROM GroupSubjectRequirements
                Where major_id=?`, [ major_id ] )
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

module.exports = { getRequired }
