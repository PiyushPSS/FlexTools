import express from "express";
import cors from "cors";
import { LinkDataUserPresent } from "./models/LinkData_UserPresent.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { LinkDataUserNotPresent } from "./models/LinkData_NoUser.js";

// Initialize dotenv to use environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

function generateRandomString(length) {
    const chars = process.env.UNIQUE_KEY;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}


app.get('/s/:shortID', (req, res) => {
    const shortLink = req.params.shortID;

    const userID = req.body.userID;

    if (userID != null && userID != undefined && userID != '') {
        //user is logged in

        LinkDataUserPresent.findOne({ shortUrl: shortLink }).then((data) => {
            if (data != null && data != undefined) {
                res.status(200).json({ redirectUrl: data.redirectUrl });

            } else {
                res.status(404).json({ error: 'Link not found' });
            }
        });

    } else {
        //user is not logged in

        LinkDataUserNotPresent.findOne({ shortUrl: shortLink }).then((data) => {
            if (data != null && data != undefined) {
                res.status(200).json({ redirectUrl: data.redirectUrl });
            } else {
                res.status(404).json({ error: 'Link not found' });
            }
        });
    }

})


function checkIfLinkAlreadyExists_NOUSER(shortLink) {
    LinkDataUserNotPresent.findOne({ shortUrl: shortLink }).then((data) => {
        if (data != null && data != undefined) {
            return true;
        } else {
            return false;
        }
    })
}


function checkIfLinkAlreadyExists_USER(shortLink) {
    LinkDataUserPresent.findOne({ shortUrl: shortLink }).then((data) => {
        if (data != null && data != undefined) {
            return true;
        } else {
            return false;
        }
    })
}

function getShortLink() {
    return generateRandomString(Math.floor(Math.random() * 3) + 3);
}


app.post('/api/shorten', (req, res) => {
    if (req.body.link != null && req.body.link != undefined && req.body.link != '') {

        //link has been received successfully.
        const link = req.body.link;
        const userID = req.body.userID;

        if (userID != null && userID != undefined && userID != '') {
            //user is logged in
            //save the link to the loggedin user's account.

            let shortLink = getShortLink();

            while (checkIfLinkAlreadyExists_USER(shortLink)) {
                shortLink = getShortLink();
            }
            console.log(shortLink);

            const newLinkData = new LinkDataUserPresent({
                redirectUrl: link,
                shortUrl: shortLink,
                createdBy: userID
            });

            newLinkData.save().then((data) => {
                res.status(200).json({ shortLink: data.shortUrl });
            }).catch((error) => {
                res.status(500).json({ error: 'Internal server error' + error });
            });

        } else {
            //user is not logged in

            let shortLink = getShortLink();

            while (checkIfLinkAlreadyExists_NOUSER(shortLink)) {
                shortLink = getShortLink();
            }

            const newLinkData = new LinkDataUserNotPresent({
                redirectUrl: link,
                shortUrl: shortLink,
            });

            newLinkData.save().then((data) => {
                res.status(200).json({ shortLink: data.shortUrl });
            }).catch((error) => {
                res.status(500).json({ error: 'Internal server error' + error });
            });
        }

    } else {
        res.status(400).json({ error: 'Link is required' });
    }
})

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT);
})