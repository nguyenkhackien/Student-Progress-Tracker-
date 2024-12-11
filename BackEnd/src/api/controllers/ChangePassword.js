const connection = require("../../config/database")
const bcrypt = require("bcrypt")

const changePassword = async (req, res) => {
    const { Account, Password, newPassword } = req.body
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    try {
        const [user] = await connection
            .promise()
            .query("SELECT pass FROM Accounts WHERE tk = ?", [Account])

        if (user.length === 0) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" })
        }

        const isPasswordCorrect = await bcrypt.compare(Password, user[0].pass)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng" })
        }
        const [result] = await connection
            .promise()
            .query("UPDATE Accounts SET pass = ? WHERE tk = ?", [
                hashedPassword,
                Account,
            ])
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" })
        }
        res.status(200).json({ message: "Đổi mật khẩu thành công" })
    } catch (err) {
        res.status(500).json({ message: "Lỗi server" })
    }
}
module.exports = { changePassword }
