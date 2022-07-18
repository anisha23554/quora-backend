const mongoose = require("mongoose")

const answerSchema = mongoose.Schema({
     userId:{
        type:String,
        required:true
     },
     questionId:{
       type:String, // question_id
       required:true
     },
     content:{
         type:String,
         required:true
     }, 
     isAnonymous:{
         type:Boolean,
         default:false
     },
     date:{
         type:String
     }
})

const Answer =  mongoose.model('Answer',answerSchema)
module.exports = Answer