const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    try {
        const cookie= req.cookies.token;
        const token=cookie || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Access Denied. Please login first."
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "failed",
            message: "Invalid or Expired Token"
        });
    }
};
module.exports = {authMiddleware};