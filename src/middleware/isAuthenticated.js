import jwt from "jsonwebtoken";

/* =====================================================
   JWT PROTECT MIDDLEWARE
===================================================== */
const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // ❌ Token missing after Bearer
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    // 🔐 Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    // 🔁 Token expired
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Access token expired",
      });
    }

    // ❌ Invalid token
    return res.status(401).json({
      success: false,
      message: "Invalid access token",
    });
  }
};

export default protect;
