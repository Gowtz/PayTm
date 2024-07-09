const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Create schema for the user
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name should not be empty"],
        minLenght:[3,"Minimum 3 character"]
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password should not be empty"],
    }
},{timestamps:true})

// Hashing password before storing to db
userSchema.pre('save', async function(next){
    const salt =  await bcrypt.genSalt()
    this.password =  await bcrypt.hash(this.password,salt)
    next()
})


//Custom Login hook in model useing userSchema
userSchema.statics.login= async function(email,password){
    const user = await User.findOne({email})
    
    if(user){
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        else{
            throw Error("invalid Password")
        }
    }
    else{
        throw Error("Incorrect Email")
    }
}
const User = mongoose.model('user',userSchema)

module.exports = User