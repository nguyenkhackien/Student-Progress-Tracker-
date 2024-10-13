const connection = require("../../config/database")
const bcrypt = require("bcrypt")

const editPassword = async (req, res) => {
    const { Account,Password, newPassword } = req.body
    const salt = await bcrypt.genSalt(5)
    const hashedPassword = await bcrypt.hash( newPassword, salt )
    const [check] = await connection
        .promise()
        .query( "SELECT * FROM Accounts WHERE tk = ?", [ Account ] )
    if (check.length === 0) {
        return res.status(400).json({ message: "Tài Khoản không tồn tạ" })
    }
    const infoUser = check[0]
    const checkPassword = await bcrypt.compare( Password, infoUser.pass )
    if (!checkPassword) {
        return res.status(400).json({ message: "Mật khẩu không đúng" })
    }
    try {
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
module.exports = { editPassword }
