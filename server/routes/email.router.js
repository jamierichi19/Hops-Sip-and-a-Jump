const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const nodemailer = require('nodemailer');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
require('dotenv').config();


//GET route to get email list
router.get('/', rejectUnauthenticated, (req, res) => {
    const id = req.query.id;
    const sqlText = `SELECT "user"."email"
    FROM "user"
    JOIN "favorites" on "favorites"."user_id" = "user"."id"
    JOIN "brewery_info" on "brewery_info"."id" = "favorites"."brewery_id"
    WHERE "brewery_info"."id" = $1;`
    pool.query(sqlText, [id])
        .then((results) => {
            res.send(results.rows)})
        .catch(error => {
            console.log('Error GETTING emails:', error);
            res.sendStatus(500);
    });
});

//POST Route to send email
router.post('/', rejectUnauthenticated, (req, res) => {
    let emailArray = req.body.emailList;
    console.log(req.body)
    let emailList = []

    emailArray.forEach((element) => {
        emailList.push(element.email)
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      })

      const mailOptions = {
        from: `${req.user.email}`,
        to: emailList,
        subject: `${req.body.subject}`,
        text: `${req.body.body}`,
        replyTo: `${req.user.email}`
      }

      transporter.sendMail(mailOptions, function(err, res) {
        if (err) {
          console.error('there was an error: ', err);
        } else {
          console.log( res )
        }
      })
})
;

module.exports = router;