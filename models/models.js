const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reportSchema = new Schema({
    reportType: {type: String, required: true},
    description: {type: String, required: false},
    createdBy: {type: String, required: true},
    roomNumber: {type: String}
}, { timestamps: true })

const Report = mongoose.model('Report', reportSchema)

const userSchema = new Schema({
    admin: {type: Boolean, default: false, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    room: {type: String}
})

const User = mongoose.model('User', userSchema)

module.exports = {
    Report,
    User 
}