const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'user',
        required:true
    },
    balance:{
        type:Number,
        default:10000
    }
})

const Account = mongoose.model('account',accountSchema)

module.exports = Account