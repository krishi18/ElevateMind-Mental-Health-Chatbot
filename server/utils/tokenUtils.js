const jwt = require("jsonwebtoken");
const { JWT_SECRET, NODE_ENV } = require("../config/envConfig");
const crypto = require("crypto");
const generateToken = (userID) => {
  return jwt.sign({ userID }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

// const generateTokenAndSetCookie = (res, userID) => {
//   const token = generateToken(userID);
//   console.log('token: ', token);
//   res.cookie("token", token, {
//     httpOnly: true, // accessible only by web server
//     secure: NODE_ENV === "production", // https - only send on https(production) http - send on http(development)
//     sameSite: "strict",
//     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//   });

//   return token;
// };

const generateTokenAndSetCookie = (res, userID) => {
  const token = generateToken(userID);
  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    // path: '/api',
    sameSite: 'none',
    // domain: '.onrender.com', //This matches both subdomains
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Log the Set-Cookie header
  const cookieHeader = res.getHeader('Set-Cookie');
  console.log('Set-Cookie header:', formatCookieHeader(cookieHeader)); // Use formatCookieHeader

  return token;
};

const formatCookieHeader = (header) => {
  if (!header) return 'Cookie header not set';
  if (Array.isArray(header)) {
    return header.map((cookie) => cookie.trim()).join('\n');
  }
  return header.trim();
};

const createVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString();
const createResetToken = () => crypto.randomBytes(20).toString("hex");

module.exports = {
  generateTokenAndSetCookie,
  createVerificationToken,
  createResetToken,
};
