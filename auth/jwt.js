const jwt = require("jsonwebtoken");
const jwtAuthMidekware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token Not Found" });

  const token = req.headers.authorization.split("")[1];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    const decoded = jwt.verify(token, proces.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

const generateToken=(userdata)=>{
    return jwt.sign(userdata.JWT_SECRET_KEY,{expiredIn:4000})
}
module.exports = { jwtAuthMidekware , generateToken };