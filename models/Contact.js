const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "This field is required.",
    },
    email: {
        type: String,
        required: "This field is required.",
    },
    message: {
        type: String,
    } 

})

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;