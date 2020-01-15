const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//PUT route editing brewery details
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const breweryName = req.body.name;
    const bio = req.body.bio;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    const id = req.body.id
    const queryString = `UPDATE "brewery_info" SET "brewery_name" = $1, "bio" = $2, "street" = $3, "city" = $4, "state" = $5, "zip" = $6 where id = $7;`;
    pool.query(queryString, [breweryName, bio, street, city, state, zip, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});


module.exports = router;