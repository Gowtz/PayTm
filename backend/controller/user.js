const User = require("../model/user");
const Account = require("../model/account");
const jwt = require("jsonwebtoken");
const { z } = require("zod");


const signinBody = z.object({
  email:z.string().email(),
  password:z.string()
})
const signUpBody = z.object({
  name:z.string(),
  email:z.string().email(),
  password:z.string()
})
// Handle error : Thanks to tutorial by 'Net Ninja' video 'JWT playlist'
const handlerror = (err) => {
  const errors = { err: { email: "", password: "" } };
  if (err.code) {
    errors.err.email = "User Already exist";
  }
  if (err.message === "invalid Password") {
    errors.err.password = "invalid Password";
  }
  if (err.message === "Incorrect Email") {
    errors.err.email = "Incorrect Email";
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
// This generate JWT token
const genToken = (id) => {
  const max = 60 * 60 * 24 * 3;
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: max,
  });
};
// SignIn Method
const signIn = async (req, res) => {
  const { email, password } = req.body;
  const parse = signinBody.safeParse(email,password);
  if(!parse){
    res.json({error:"incorrect inputs"})
  }
  try {
    const user = await User.login(email, password);
    const token = genToken(user._id);
    res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.status(201).json({ name: user.name, mail: user.email });
  } catch (err) {
    console.log(err);
    res.status(412).json(handlerror(err));
  }
};

//Signup Method
const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const parse = signUpBody.safeParse(name,email,password);
  if( !parse){
    res.json({error:"incorrect inputs"})
  }
  try {
    const user = await User.create({ name, email, password });
    const acc = await Account.create({ userId: user._id });
    const token = genToken(user._id);
    res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.status(201).json({ name: user.name, mail: user.email });
  } catch (err) {
    console.log(err);
    res.send(handlerror(err))
  }
};

// Geting Users for search request
const getUsers = async (req, res) => {
  const filter = req.query.filter;
  console.log(filter);
  try {
    const users = await User.find({
      
        
          name: {
            $regex: filter,
          },
      
      
    });
    res.status(200).json({
      users: users.map((ele) => ({
        id: ele.id,
        name: ele.name,
        mail: ele.email,
      })),
    });
  } catch (error) {
    //TODO: Write catch Code later
    console.log(error);
  }
};

module.exports = { signIn, signUp, getUsers };
