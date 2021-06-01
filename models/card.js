const { text } = require("body-parser");
const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        maxlength: 30,
        require:true,
        text: true,
        index: true,
    },
    description: {
        type: String,
        maxlength:50
    },
    creater: {
        type: String,
        maxlength: 20,
        require: true
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

cardSchema.index({title: "text"});
const Card = mongoose.model("Card", cardSchema);
Card.createIndexes();

module.exports = Card;