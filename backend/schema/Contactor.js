"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactorSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    phone: {
        type: Schema.Types.Number,
        required: true
    },
    city: {
        type: Schema.Types.String,
        required: true
    },
    state: {
        type: Schema.Types.String,
        required: true
    },
    country: {
        type: Schema.Types.String,
        required: true
    }
});

ContactorSchema.statics.create = function(obj) {
    const Contactor = mongoose.model("Contactor", ContactorSchema);
    const contactor = new Contactor();
    contactor.name = obj.name;
    contactor.email = obj.email;
    contactor.phone = Number(obj.phone);
    contactor.city = obj.city;
    contactor.state = obj.state;
    contactor.country = obj.country;
    return contactor;
}

module.exports = mongoose.model("Contactor", ContactorSchema);