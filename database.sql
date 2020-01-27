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
	"comment_body" VARCHAR (500),
	"flag" BOOLEAN 
);

