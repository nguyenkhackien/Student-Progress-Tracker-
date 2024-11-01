const connection = require("../../config/database")

const getDetailData = async ( req, res ) =>
{
    const maLMH = req.query.maLMH
    const semester_id = req.query.semester_id
    const nhom = req.query.nhom
    const searchType = req.query.searchType
    try {
        if(searchType==="Lịch học"){
            const [Data] = await connection.promise().query(
                `SELECT maLMH,tenMH,Giangvien,giangduong,thu,tiet,nhom FROM lichhoc
            Where maLMH=? and semester_id=? and (nhom ='CL' or nhom = ?)`,
                [maLMH, semester_id, nhom]
            )
            if (Data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Hiện không có dữ liệu môn này",
                })
            }
            res.status(200).json({
                success: true,
                message: "Lấy thông tin thành công",
                Data: Data,
            })
        } else
        {
            const [Data] = await connection.promise().query(
                `SELECT * FROM LichThi
            Where maLMH=? and semester_id=? `,
                [maLMH, semester_id]
            )
            if (Data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Hiện không có dữ liệu môn này",
                })
            }
            res.status(200).json({
                success: true,
                message: "Lấy thông tin thành công",
                Data: Data,
            })
            
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã có lỗi xảy ra",
            error,
        })
    }
}

module.exports = { getDetailData }
