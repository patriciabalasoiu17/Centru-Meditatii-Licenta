require('dotenv').config()
const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const studentRoutes = require('./routes/StudentRoutes')
const teacherRoutes = require('./routes/TeacherRoutes')


// express app
const app = express()

app.use(cors())

app.use(express.json())

app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})

app.use('/api/student', studentRoutes)
app.use('/api/teacher', teacherRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT, ()=> {
        console.log('connected to db & listening on port ', process.env.PORT)
    })
})
.catch((error) => {
    console.log(error)
})


