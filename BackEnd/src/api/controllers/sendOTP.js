const nodemailer = require("nodemailer")
const connection = require("../../config/database")
const transporter = require("../../config/nodemailer")

const sendOTP = async (req, res) => {
    const { Email, Account } = req.body
    const generateOTP = () =>
        Math.floor(100000 + Math.random() * 900000).toString()
    const OTP = generateOTP()
    try {
        const [existAccount] = await connection
            .promise()
            .query("SELECT * FROM Accounts WHERE tk = ? AND Email = ?", [
                Account,
                Email,
            ])

        if (existAccount.length === 0) {
            // Nếu không tìm thấy email
            return res.status(404).json({
                success: false,
                message: "Email hoặc tài khoản sai",
            })
        }
        await transporter.sendMail(
            {
                from: "Tra cứu UET", // sender address
                to: Email, // list of receivers
                subject: "verification", // Subject line
                text: "your verification code is", // plain text body
                html: `<b>${OTP}<b>`, // html body
            },
            (error) => {
                if (error) {
                    return res.status(500).json({
                        success: false,
                        message: "Lỗi khi gửi email",
                        error,
                    })
                }
                res.status(200).json({
                    success: true,
                    message: "Mã OTP đã được gửi thành công",
                })
            }
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Đã có lỗi xảy ra",
            error,
        })
    }
}

module.exports = { sendOTP }
