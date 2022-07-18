// ROUTES:- /api/v1/answers/add

const express = require('express')
const Answer = require("../db/models/Answer") 
const router = express.Router()

/* POST ROUTE: /api/v1/answers/add (public)
PARAMETERS ACCEPTED: _id (userid),question_id,content
*/

router.post('/add',async(req,res)=>{
    try{
        const {userId,questionId,content,isAnonymous=false} = req.body 
        const today = new Date()
        const date = today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear()
        const answer = new Answer({userId,questionId,content,isAnonymous,date})
        await answer.save()
        res.json({
            status:'SUCCESS',
            message:'Answer posted successfully!',
            answer
        })
    }
    catch(error){
        res.json({
          status:'FAILED',
          message:error.message
        })
    }
})
router.get('/all',async(req,res)=>{
    try{
       const answers = await Answer.find({})
       res.json({
         answers
       })
    }
    catch(error){
       res.json({
         error:error.message
       })
    }
})
router.post('/:questionId',async(req,res)=>{
    try{
      const {questionId} = req.params
      console.log(questionId)
      const answers = await Answer.find({questionId:questionId})
      console.log(answers)
      res.json({
        status:'SUCCESS',
        answers
      })
    }
    catch(e){
        res.json({
            status:'FAILED',
            message:e.message
        })
    }
})

module.exports = router