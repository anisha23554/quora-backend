const dotenv = require("dotenv")
dotenv.config()
const express = require('express')
const app = express()
const connectDb = require('./db/connectDb')
const AuthRoutes = require("./routes/AuthRoutes")
const QuestionRoutes = require("./routes/QuestionRoutes")
const AnswerRoutes = require("./routes/AnswerRoutes")

const cors = require('cors')
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api/auth",AuthRoutes)
app.use("/api/answer",AnswerRoutes)
app.use("/api/question",QuestionRoutes)

connectDb()

app.listen(PORT,()=>{
    console.log(`server listening at PORT:${PORT}`)
})
app.get("/",(req,res)=>{
   res.json(`server running at port:${PORT}`)
})