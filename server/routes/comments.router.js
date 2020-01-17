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

//POST Comments 
router.post('/', rejectUnauthenticated, (req, res) => {
    let userId= req.user.id;
    let breweryId = req.body.breweryId;
    let comment = req.body.comment;
    let flag = false;
    const queryString = `INSERT INTO "comments" (user_id, brewery_id, comment_body, flag) VALUES ($1, $2, $3, $4);`;
    pool.query(queryString, [userId, breweryId, comment, flag])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

//DELETE route for removing brewery comments
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`DELETE FROM "comments"  WHERE "brewery_id" = $1;`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
});

module.exports = router;