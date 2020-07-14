const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        subject: {
            type: String,
            required: true,
            maxlength: 50
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        message: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
