const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');

const Authenticate = async (req, res, next) => {
    try {
        let token = null;

        // Check cookies
        if (req.cookies && (req.cookies.token || req.cookies.jwtoken1)) {
            token = req.cookies.token || req.cookies.jwtoken1;
        }

        // Check Authorization header (Bearer token)
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const secret = process.env.SECRET_KEY || 'freelansters_jwt_secret_key_2026';
        const decoded = jwt.verify(token, secret);

        const rootUser = await User.findOne({ _id: decoded._id });
        if (!rootUser) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }

        req.token = token;
        req.rootUser = rootUser;
        req.user = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (err) {
        console.error("Authenticate middleware error:", err.message);
        return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    }
};

Authenticate.verifyToken = Authenticate;
module.exports = Authenticate;
