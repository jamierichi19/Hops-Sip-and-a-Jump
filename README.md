# Hops, Sip, & a Jump

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

Sign up for AWS S3 and Create a Bucket:
- [AWS](https://s3.console.aws.amazon.com/)

## Create database and table

Create a new database called `prime_app` and create tables running this script:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "type" VARCHAR(10) NOT NULL
);

CREATE TABLE "brewery_info"(
	"id" SERIAL PRIMARY KEY,
	"brewery_name" VARCHAR (80) NOT NULL,
	"bio" VARCHAR (500),
	"street" VARCHAR(80),
	"city" VARCHAR (80),
	"state" VARCHAR (80),
	"zip" INT,
	"image_url" VARCHAR(100),
	"user_id" INT REFERENCES "user"
);

CREATE TABLE "favorites" (
	"user_id" INT REFERENCES "user",
	"brewery_id" INT REFERENCES "brewery_info",
    PRIMARY KEY ("user_id", "brewery_id")
);

CREATE TABLE "comments" (
	"comment_id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"brewery_id" INT REFERENCES "brewery_info",
	"comment_body" VARCHAR (500),
	"flag" BOOLEAN 
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
    EMAIL=YOUR_GMAIL_ADDRESS
    PASSWORD=YOUR_GMAIL_PASSWORD
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
    * Note: In order for the email function to work your email address must be a gmail account.
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server` in one terminal
* Run `npm run client` in another terminal
* Navigate to `localhost:3000`

## Using the App

* Sign up as many accounts as you wish. Owner accounts have the ability to add new breweries, upload a photo, edit their brewery details, and send emails to users who "liked" their brewery.
* Patron accounts can search for breweries by city, view brewery details, leave comments about the brewery, "Like" a breery (which will add it to their favotires page), and view breweries on their favorites page.