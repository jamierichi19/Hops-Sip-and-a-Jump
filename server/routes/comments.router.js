const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

//GET route for comments
router.get('/', rejectUnauthenticated, (req, res) => {
    const id = req.query.id
    pool.query(`SELECT * FROM "comments" 
    JOIN "user" on "user"."id" = "comments"."user_id"
    WHERE "brewery_id" = $1;`, [id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

//DELETE route for removing brewery
router.delete('/:id', (req, res) => {
    pool.query(`DELETE FROM "comments"  WHERE "brewery_id" = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
});

module.exports = router;