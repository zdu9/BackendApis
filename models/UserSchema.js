// Load required packages
var mongoose = require('mongoose');
    task = require('./TaskSchema');
// Define our user schema
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    /*
    * "pendingTasks" - [String] - The _id fields of the pending tasks that this user has*/

    pendingTasks: [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks"
        // default: ""

    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }

});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
