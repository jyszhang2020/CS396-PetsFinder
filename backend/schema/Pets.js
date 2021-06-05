"use strict"

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetsSchema = new Schema({
    species: {
        type: Schema.Types.String,
        required: true
    },
    breed: {
        type: Schema.Types.String,
        required: false
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    sex: {
        type: Schema.Types.String,
        required: true
    },
    dob: {
        type: Schema.Types.String,
        required: true
    },
    image_url: {
        type: Schema.Types.String,
    },
    price: {
        type: Schema.Types.Number,
        required: true
    },
    contact_phone: {
        type: Schema.Types.String,
        required: true
    },
    detail: {
        type: Schema.Types.String,
    },
    location: {
        type: Schema.Types.String,
        required: true
    },
});

PetsSchema.statics.create = function(obj) {
    const Pet = mongoose.model("Pets", PetsSchema);
    const pet = new Pet();
    pet.species = obj.species;
    pet.breed = obj.breed;
    pet.name = obj.name;
    pet.sex = obj.sex;
    pet.dob = obj.dob;
    pet.image_url = obj.image_url;
    pet.price = obj.price;
    pet.contact_phone = Number(obj.contact_phone);
    pet.detail = obj.detail;
    pet.location = obj.location;
    return pet;
}

module.exports = mongoose.model("Pets", PetsSchema);