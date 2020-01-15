const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


//GET route for image
router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM "brewery_info" WHERE "user_id" = $1;`, [req.user.id])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error GETTING brewery info:', error);
            res.sendStatus(500);
    });
});

module.exports = router;