const mongoose = require('mongoose') 

const questionSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId:{
     type:String,
     required:true
    },
    isAnonymous:{
        type:Boolean,
        default:false
    },
    date:{
        type:String
    },
    upvotes:{
        type:Number,
        default:0
    }
})

const Question = mongoose.model('Question',questionSchema)
module.exports = Question