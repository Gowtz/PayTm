const mongoose = require("mongoose");
const Account = require("../model/account");
const User = require("../model/user");
//Get balance of the current logged in user
const getBalance = async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  const balance = account.balance;
  res.status(200).json({ balance});
};


// Transfer amount Method

// WARN : no mongodb session started  can cause a problem later
const transaction = async (req, res) => {
  // const session = await mongoose.startSession();
  // session.startTransaction();
  const { amount, to } = req.body;
  const user = await User.findOne({ _id: req.userId }) // get current user info
  const toAccount = await User.findOne({_id: to}); // get 'TO' user info 
  const account = await Account.findOne({userId: req.userId })  // get current account info
 
  // possible error occurance 
  if(!user){
    // await session.abortTransaction()
    res.status(400).json({msg:"No abbount holder found"});
  }
  if(!account || account.balance < amount){
    // await session.abortTransaction();
    res.status(400).json({msg:"Not enough balance"});
  }
  if(!toAccount){
    // await session.abortTransaction();
    res.status(400).json({msg:"Invalid To Account"})
  }

else{


  // Perform transaction
  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }) //.session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } })
    // Commit the transaction
    // await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
  }

};

module.exports = { getBalance, transaction };
