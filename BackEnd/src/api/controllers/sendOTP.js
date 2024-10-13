const connection = require("../../config/database")
const transporter = require( "../../config/nodemailer" )
require("dotenv").config()
const jwt = require("jsonwebtoken")
const sendOTP = async (req, res) => {
    const {  Account } = req.body
    const OTP_SECRET = process.env.OTP_SECRET 
    const OTP_EXPIRY = "5m" 
    const generateOTP = () =>
        Math.floor(100000 + Math.random() * 900000).toString()
    const OTP = generateOTP()
    const token = jwt.sign({ OTP }, OTP_SECRET, { expiresIn: OTP_EXPIRY })

    try {
        const [existAccount] = await connection
            .promise()
            .query("SELECT Email FROM Accounts WHERE tk = ? ", [
                Account,
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
                to: existAccount[0].Email, // list of receivers
                subject: "verification", // Subject line
                text: "your verification code is", // plain text body
                html: `Mã xác nhận của bạn là: <b>${OTP}<b>`, // html body
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
                    token: token,
                    Email: existAccount[0]
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
