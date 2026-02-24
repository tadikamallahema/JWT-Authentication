import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  const JWT_SECRET = "helloencrypt";

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }
  console.log("Cookies received:", req.cookies);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);  // ✅ VERIFY, not sign
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token Expired or Invalid" });
  }
};

export default authMiddleware;
/* if(!authHeader){
  const authHeader=req.header.authorization;
      return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch (err) {
  if (err.name === "TokenExpiredError") {
      console.log("❌ Token Expired at:", err.expiredAt);
    return res.status(401).json({ message: "Token Expired" });
  } else {
    return res.status(401).json({ message: "Invalid Token" });
  }
} */