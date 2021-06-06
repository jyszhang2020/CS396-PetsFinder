"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
});

EmailSchema.statics.create = function(obj) {
    const Email = mongoose.model("Email", EmailSchema);
    const email = new Email();
    email.email = obj.email
    
    return email;
}

module.exports = mongoose.model("Email", EmailSchema);