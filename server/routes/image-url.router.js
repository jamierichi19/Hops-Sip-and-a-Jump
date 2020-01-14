const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');





//POST route for uploading image
router.post('/', rejectUnauthenticated, (req, res) => {
    const imageUrl = req.body.imageUrl
    const id = req.user.id;
    const queryString = `INSERT INTO "brewery_image" (image_url, user_id) VALUES ($1, $2);`;
    pool.query(queryString, [imageUrl, id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});




module.exports = router;