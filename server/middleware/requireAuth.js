const jwt = require("jsonwebtoken");
const User = require("../module/user");
async function requireAuth(req, res, next) {
  try {
    //read token off cookies
    const token = req.cookies.Authorization;
    //decode
    const decode = jwt.verify(token, process.env.SECRET);
    //check expiration
    if(Date.now()>decode.exp) return res.sendStatus(401);
    //find user and decode
    const user = await User.findById(decode.sub);
    if(!user) return res.sendStatus(401);
    //attach user req
    req.user = user;

    console.log("in the middle");
    next();
  } catch (err) {
    return res.sendStatus(401);
  }
}
module.exports = requireAuth;
