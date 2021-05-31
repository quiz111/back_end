const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        maxlength: 50,
    },
    name: {
        type: String,
        maxlength: 20,
    },
    password: {
        type: String,
        minlength:5
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;