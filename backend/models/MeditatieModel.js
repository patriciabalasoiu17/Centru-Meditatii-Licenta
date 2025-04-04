const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const meditatieSchema = new Schema ({
    Subject: {
        type: String,
        required: true 
    },
    Date: {
        type: String, 
        required: true 
    },
    Duration:{
        type: String,   
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Meditatie', meditatieSchema)

