const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//POST liked brewery 
router.post('/', rejectUnauthenticated, (req, res) => {
    const breweryId = req.body.id
    const userId = req.user.id
    const queryString = `INSERT INTO "favorites" (user_id, brewery_id) VALUES ($1, $2);`;
    pool.query(queryString, [userId, breweryId])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});


module.exports = router;