const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    creater: {
        type: String,
        maxlength: 20
    },
    word: {
        type: String,
        require: true
    },
    mean: {
        type: String,
        require: true
    }
})

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;