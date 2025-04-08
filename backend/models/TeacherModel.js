const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const TeacherSchema = new Schema ({
    Name: {
        type: String,
        required: true 
    },
    Mail: {
        type: String, 
        required: true 
    },
    Phone:{
        type: String
    },
    Subject:{
        type: [String],   
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Teacher', TeacherSchema)

