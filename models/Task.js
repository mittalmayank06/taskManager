const mongoose = require("mongoose");
//MOngoose MODELS
const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Must provide name'],
        trim: true,
        maxlength: [20,'Name must not more than 20 char'],
    },
     completed:{
        type: Boolean,
        default: false
     }
})

module.exports = mongoose.model('Task', TaskSchema)