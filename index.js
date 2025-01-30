const express = require('express')
const app = express()

const cors = require('cors')

const corsOption ={
    origin:"*",
    credential: true,
    optionSuccessStatus: 200
};

app.use(cors(corsOption))

const { initializeDatabase } = require('./db/db.connection')

app.use(express.json())

initializeDatabase()

app.get("/", (req, res)=>{
    res.send("Welcome to Intern Job.")
})

//import router 
const jobPostRouter = require('./routes/JobPost.route')

app.use("/jobs", jobPostRouter)

//port
const PORT = 3000
app.listen(PORT , ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

module.exports = app