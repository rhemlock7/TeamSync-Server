const { Schema, model } = require('mongoose');


const listSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
        trim: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    cards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Card',
        },
    ]
});

const List = model('List', listSchema);

module.exports = List;
