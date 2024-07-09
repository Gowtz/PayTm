const jwt = require("jsonwebtoken");
const User = require('../model/user')
const authenticateUser = async (req, res, next) => {
    
  const token = req.cookies.jwt;
  try {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.json({ error: err });
      } else {
        const user = await User.findOne({ _id: decodedToken.id });

            req.userId = user.id;
            next();
 
      }
    });
  } catch (error) {
    //TODO: write Catch code later
    console.log(error);
    res.json(error)
  }
};
const getCurrentUser = async(req,res,next)=>{
    const token = req.cookies.jwt;

jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
    if (err) {
      res.json({error:"Not authorized"})
    } else {
      const user = await User.findOne({ _id: decodedToken.id });
      res.json({ id: user._id, name: user.name });
    }
  });
}
module.exports = {authenticateUser,getCurrentUser};
