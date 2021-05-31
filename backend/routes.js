"use strict";

const router = require("express").Router();

const Pets = require("./schema/Pets");
const Contactor = require("./schema/Contactor");


router.route("/")
    .get((_req, res) => {
        console.log("GET /");
        res.status(200).send({
            data: "App is running."
        });
    });

router.route("/allpets")
    .get((req, res) => {
        console.log("GET /allpets");
        Pets.find({})
            .then(pet => {
                res.status(200).send(pet);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    });

router.route("/allpets/:id")
    .get((req, res) => {
        console.log(`GET /allpets/${req.params.id}`);
        Pets.find({"_id": req.params.id})
            .then(pet => {
                if (pet.length != 0) {
                    res.status(200).send(pet[0]);
                } else {
                    res.status(404).send({"message": `Pets with id ${req.params.id} does not exist.`});
                }
            })
            .catch(err => {
                res.status(404).send(err);
            });
    });

router.route("/randompets")
    .get((req, res) => {
        console.log("GET /randompets");
        Pets.aggregate([
                { $sample: { size:  6} }
            ])
            .then(pet => {
                res.status(200).send(pet);
            })
            .catch(err => {
                res.status(500).send(err);
            })
    });

router.route("/filterpet")
    .post((req, res) => {
        console.log("POST /filterpet")

        let filters = req.body

        console.log(filters)
        Pets.find(filters)
            .then(data => {
                if (data.length !== 0) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send({"message": `There are currently no such pets available`});
                }
            })
            .catch(err => {
                res.status(404).send(err);
            });
    })

router.route("/listpet")
    .post((req, res) => {
        console.log("POST /listpet");
        const jsonObj = req.body;

        Pets.create(jsonObj).save()
            .then(
                () => {
                    res.status(201).send("success");
                }
            )
            .catch(err => {
                res.status(500).send(err.message);
            });
    });

router.route("/contactor")
    .post((req, res) => {
        console.log("POST /contactor");
        const jsonObj = req.body;

        Contactor.create(jsonObj).save()
            .then(data => {
                res.status(201).send(data);
            })
            .catch(err => {
                res.status(500).send(err.message);
            })
    });

module.exports = router;
