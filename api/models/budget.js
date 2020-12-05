const mongoose = require('mongoose');
const { Schema } = mongoose;

const budget = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    whatsApp: {
        type: String
    },
    message: {
        type: String
    }
},{
    timestamps: true
});

mongoose.model('Budget', budget);
