import admin from "../firebase/firebase";

/* =====================================================
   FIREBASE AUTH PROTECT MIDDLEWARE
===================================================== */
const protect = async (req, res, next) => {
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

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
      });
    }

    // 🔐 Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);

    // ❌ Block unverified email/password users
    if (!decoded.email_verified) {
      return res.status(403).json({
        success: false,
        message: "Email not verified",
      });
    }

    // ✅ Attach user info
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || "",
      role: decoded.role || "user",
    };

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protect;
