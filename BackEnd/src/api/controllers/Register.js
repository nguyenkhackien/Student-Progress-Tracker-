const connection = require("../../config/database")
const bcrypt = require("bcrypt")
const register = async (req, res) => {
    const { UserName, Account, Password, Email } = req.body
    try {
        const [existAccount] = await connection
            .promise()
            .query("SELECT * FROM Accounts WHERE tk = ?", [Account])
        if (existAccount.length > 0) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(Password, 5)
        const now = new Date()

        const formattedDate =
            now.getFullYear() +
            "-" +
            String(now.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(now.getDate()).padStart(2, "0") +
            " " +
            String(now.getHours()).padStart(2, "0") +
            ":" +
            String(now.getMinutes()).padStart(2, "0") +
            ":" +
            String(now.getSeconds()).padStart(2, "0")

        await connection
            .promise()
            .query(
                "INSERT INTO Accounts (user_name,tk, Email, pass, create_time,role,isLogin) VALUES (?,?,?,?,?,?,?)",
                [
                    UserName,
                    Account,
                    Email,
                    hashedPassword,
                    formattedDate,
                    "USER",
                    "FALSE",
                ]
            )

        res.status(201).json({ message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ message: "error register user", error })
    }
}

module.exports = { register }
