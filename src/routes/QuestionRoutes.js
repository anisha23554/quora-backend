/*
  ROUTES:- /api/v1/question/add , /api/v1/question/all
*/
const express = require('express')
const { findById } = require('../db/models/Question')
const Question = require("../db/models/Question")

const router = express.Router()

/*
  POST ROUTE:- /api/v1/question/add (public)
  PARAMETERS ACCEPTED:_id (userid),content(String),isAnonymous(Boolean)
*/

router.post('/add',async(req,res)=>{ 
    try{
       const {userId,content,isAnonymous=false} = req.body
       const today = new Date()
       const date =  today.getDate()+'-'+today.getMonth()+'-'+today.getFullYear()
       const question = new Question({content,userId,date,isAnonymous})
       await question.save()
       return res.json({
         status:'SUCCESS',
         message:'Question Posted!',
         question
         })
    }
    catch(error){
        return res.json({
            status:'FAILED',
            message:error.message
        })
    }
})

/*
  GET ROUTE:- /api/v1/question/all (public)
  getting all the questions from the database
  PARAMETERS ACCEPTED:none
*/
router.get('/all',async(req,res)=>{
  try{
    const questions = await Question.find({})
    res.json({
      status:'SUCCESS',
      message:'questions fetched successfully!',
      questions
    })
  }
  catch(error){
    res.json({
      status:'FAILED',
      message:error.message
    })
  }
})
router.post('/like',async(req,res)=>{
  try{
    const {quesId} = req.body
    const question = await Question.findById(quesId)
    question.upvotes = question.upvotes+1
    await Question.findByIdAndUpdate(quesId,question)
    res.json({
      status:'SUCCESS',
      question
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