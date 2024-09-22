const bcrypt = require("bcrypt")
const connection = require("../../config/database")
const Login = async (req, res) => {
    const { Account, Password } = req.body
    try {
        const [user] = await connection
            .promise()
            .query( "SELECT * FROM Accounts WHERE tk = ?", [ Account ] )
        if (user.length === 0) {
            return res.status(400).json({ message: "Tài Khoản không tồn tại" })
        }

        const infoUser = user[0]
        const checkPassword = await bcrypt.compare(Password, infoUser.pass)
        if (!checkPassword) {
            return res.status(400).json({ message: "Mật khẩu không đúng" })
        }
        const [result] = await connection
            .promise()
            .query("UPDATE Accounts SET isLogin = ? WHERE tk = ?", [
                'TRUE',
                Account,
            ])
        const [userUpdate] = await connection
            .promise()
            .query( "SELECT * FROM Accounts WHERE tk = ?", [ Account ] )
        const infoUpdate = userUpdate[0]
        res.status(201).json({
            message: "Đăng nhập thành công",
            user: {
                UserName: infoUpdate.user_name,
                Account: infoUpdate.tk,
                Role: infoUpdate.role,
                isLogin: infoUpdate.isLogin,
            },
        })
    } catch {}
}

module.exports = { Login }
