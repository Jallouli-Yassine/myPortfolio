const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['static', 'dynamic'],
        required: true
    },
    hosted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Project', projectSchema);
