const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    });
  };
  
  const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken1;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) throw new Error("User not found");

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    } catch (err) {
        res.status(401).send("Unauthorized: No token provided");
        console.log("🚀 ~ authenticate error:", err);
    }
};

module.exports = Authenticate;
module.exports = verifyToken;
