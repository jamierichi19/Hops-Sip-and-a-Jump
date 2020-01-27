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

//DELETE route for removing like
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log(req.params.id)
    pool.query(`DELETE FROM "favorites"  WHERE "brewery_id" = $1`, [req.params.id])
    .then(()=> res.sendStatus(200))
    .catch(() => res.sendStatus(500))
});

//GET route for likes
router.get('/', rejectUnauthenticated, (req, res) => {
    const id = req.user.id
    const sqlText = `SELECT 
    "brewery_info"."brewery_name", "brewery_info"."bio", "brewery_info"."street", "brewery_info"."city", "brewery_info"."state", 
    "brewery_info"."zip","brewery_info"."image_url", "brewery_info"."id" FROM "brewery_info"
    JOIN "favorites" on "favorites"."brewery_id" = "brewery_info"."id"
    JOIN "user" on "user"."id" = "favorites"."user_id"
    WHERE "user"."id" = $1;`
    pool.query(sqlText, [id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});

//GET route for likes
router.get('/favorite/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    const sqlText = `SELECT * FROM "favorites" WHERE "brewery_id" = $1;`
    pool.query(sqlText, [id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING comments:', error);
            res.sendStatus(500);
    });
});


module.exports = router;