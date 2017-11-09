// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var TaskSchema = new mongoose.Schema({
    name: String,
    description: String,

    deadline: Date,
    completed: Boolean,
    assignedUser:{
        type: String,
        default: ""
    },
    assignedUserName:{
        type: String,
        default: ""
    },
    dateCreated:{
        type: Date,
        default: Date.now
    }




});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);
