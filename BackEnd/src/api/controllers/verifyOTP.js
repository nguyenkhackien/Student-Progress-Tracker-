const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyOTP = async (req, res) => {
    const { Token, otp } = req.body
    console.log(otp)
    try {
        // Giải mã token để lấy OTP gốc
        const decoded = jwt.verify(Token, process.env.OTP_SECRET)
        // Kiểm tra OTP người dùng nhập với OTP đã được mã hóa trong token
        if (decoded.OTP == otp) {
            return res
                .status(200)
                .json({ message: "OTP verified successfully" })
        } else {
            return res.status(400).json({ message: "Invalid OTP" })
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            // Nếu token đã hết hạn
            return res.status(400).json({ message: "OTP expired" })
        }
        return res.status(400).json({ message: "OTP expired or invalid" })
    }
}
module.exports = { verifyOTP }
