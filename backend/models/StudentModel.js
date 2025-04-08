const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const StudentSchema = new Schema ({
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
    Year:{
        type: String,   
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Student', StudentSchema)

