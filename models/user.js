const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        maxlength: 50,
    },
    password: {
        type: String,
        minlength:5
    }
})

const User = mongoose.model("User", userSchema);

export default User;