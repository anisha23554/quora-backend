// AUTH ROUTES: /login (public),/signup (public),/users (private, accessed only by ADMIN)

const express = require('express')
const QuoraUser = require('../db/models/QuoraUser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

console.log(bcrypt)


router.get('/users',async(req,res)=>{
    try{
       const users = await QuoraUser.find({});
       res.json({
           status:'SUCESS',
           message:'fetched users from db',
           users
       })
    }
    catch(error){
        res.json({
            status:'FAILED',
            message:error.message,
            users:[]
        })
    }
})
router.post('/profile/edit',async(req,res)=>{
    try{
        const {userId,description} = req.body
        const user = await QuoraUser.findById(userId)
        user.description = description
        await QuoraUser.findByIdAndUpdate(userId,user)
    
        return res.json({
            status:'SUCCESS',
            user
        })

    }catch(e){
        return res.json({
            status:'FAILED',
           message:e.message
        })
    }
})
router.post('/signup',async(req,res)=>{
    try{
      const {firstName,lastName='',email,password,description=''} = req.body
    //   hashing the password by using bcrypt
     const salt = await bcrypt.genSalt(5)
     const hashedPassword = await bcrypt.hashSync(password,salt)
     const user = new QuoraUser({firstName,lastName,email,password:hashedPassword,description})
      await user.save()
      res.json({
          status:'SUCCESS',
          message:'Account created!',
          user 
      })
     }
     catch(error){
         console.log(error)
         res.json({
            status:'FAILED',
            message:error.message
        })
     }
})

router.post('/login',async(req,res)=>{
   try{
       const {email,password} = req.body
       const user = await QuoraUser.findOne({email})
       if(user){
          const passwordMatched = await bcrypt.compare(password,user.password)
          if(passwordMatched){
            //   send jwt token
              const {_id,role} = user 
              const payload = {_id,role}
              const token = jwt.sign(payload,process.env.JWT_SECRET)
              return res.json({
                  status:'SUCCESS',
                  message:'Login Successful!',
                  token,
                  user  // destructure _id of the user in the frontend
              })
            }
          return res.json({
              status:'FAILED',
              message:'INCORRECT PASSWORD',
              token:null
          })
       }
       return res.json({
           status:'FAILED',
           message:'INCORRECT EMAIL',
           token:null
       })
   }
   catch(error){
       res.json({
           status:'FAILED',
           message:error.message,
           token:null
       })
   }
})

router.post('/user/:userId',async(req,res)=>{
   try{
      const {userId} = req.params
      const user = await QuoraUser.find({_id:userId})
      console.log(user)
      res.json({
         user
      })
   }
   catch(e){
      res.json({
        user:{},
        message:e.message
      })
   }
})

module.exports = router