const express = require('express')

const router = express.Router();
const User = require('../models/user')
const shortid = require('shortid');
router.use(express.urlencoded({ extended: false }))
const path = require('path');
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
})

let shortID = shortid.generate();

// router.post('/url', async (req, res) => {
//     try {
//         const originalURL = req.body.url;
//         await User.create({
//             shortURL: shortID,
//             redirectedURL: originalURL
//         });
//         res.send(`short url is: [ http://localhost:3000/${shortID} ]`);
//         console.log(shortID)
//     }
//     catch (err){
//         console.log(err)
//         res.status(404).json({message:'internal server error'})
//     }
// })

// router.post('/url', async (req, res) => {
//     try {
//         const originalURL = req.body.url;
//         const existingURL = await User.findOne({ redirectedURL: originalURL });

//         if (existingURL) {
//             return res.status(400).json({ message: 'URL already exists' });
//         }

//         await User.create({
//             shortURL: shortID,
//             redirectedURL: originalURL
//         });

//         res.status(201).json({ message: 'URL shortened successfully', shortURL: `http://localhost:3000/${shortID}` });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


router.post('/url', async (req, res) => {
    try {
        const originalURL = req.body.url;
        const existingURL = await User.findOne({ redirectedURL: originalURL });

        if (existingURL) {
            return res.status(200).json({
                message: 'URL already exists',
                shortURL: existingURL.shortURL
            });
        }

        const shortID = shortid.generate();
        await User.create({
            shortURL: shortID,
            redirectedURL: originalURL
        });

        res.status(201).json({
            message: 'URL shortened successfully',
            shortURL: shortID
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:shortURL', async (req, res) => {
    try {
        const shortURL = req.params.shortURL;
        const url = await User.findOne({ shortURL: shortURL })
        res.redirect(url.redirectedURL)
    }
    catch (err) {
        res.status(500).json({message:'internal server error'})
  }
})

module.exports = router;

