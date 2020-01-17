const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//GET route for comments
router.get('/', rejectUnauthenticated, (req, res) => {
    const search = req.query.city
    pool.query(`SELECT * FROM "brewery_info"
    WHERE lower("city") like lower( $1 );`, ['%'+search+'%'])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

module.exports = router;