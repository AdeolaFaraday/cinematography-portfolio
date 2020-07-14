const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            required: true
        },
        link: {
            type: String,
            required: true,
        },
        photo: {
            data: Buffer,
            contentType: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
