const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error('You need to provide a username and password');
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const result = await global.users.insertOne({ name: req.body.username, password: hash });
        res.sendStatus(201);
    } catch (err) {
        if (err.code === 11000) {
            next(new Error('Username already exists'));
        } else {
            next(err);
        }
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await global.users.findOne({ name: req.body.username });
        if (!user) {
            throw new Error('User not found');
        }
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
            req.session.user = req.body.username;
            res.sendStatus(201);
        } else {
            throw new Error('Invalid username/password');
        }
    } catch (err) {
        next(err);
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
