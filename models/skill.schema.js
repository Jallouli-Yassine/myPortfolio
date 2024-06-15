const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillsetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Frontend', 'Backend', 'Fullstack', 'Database', 'Framework','tool', 'Other'],
        required: true
    },
    proficiency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Skillset', skillsetSchema);
