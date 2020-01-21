const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//POST Brewery Info
router.post('/', rejectUnauthenticated, (req, res) => {
    const name = req.body.name
    const bio = req.body.bio;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const id = req.body.id;
    const image = req.body.image
    const queryString = `INSERT INTO "brewery_info" (brewery_name, bio, street, city, state, zip, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(queryString, [name, bio, street, city, state, zip, image, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//PUT route for uploading image
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const imageUrl = req.body.imageUrl;
    const id = req.params.id;
    const queryString = `UPDATE "brewery_info" SET "image_url" = $1 where user_id = $2;`;
    pool.query(queryString, [imageUrl, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//DELETE route for removing brewery
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "brewery_info"  WHERE "id" = $1`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
});

module.exports = router;