const connection = require("../../config/database")
const bcrypt = require("bcrypt")

const changePassword = async (req, res) => {
    const { Account, newPassword } = req.body
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    console.log(hashedPassword)
    try {
        const [result] = await connection
            .promise()
            .query("UPDATE Accounts SET pass = ? WHERE tk = ?", [
                hashedPassword,
                Account,
            ] )
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" })
        }
        res.status(200).json({ message: "Đổi mật khẩu thành công" })
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" })
    }
}
module.exports = { changePassword }
