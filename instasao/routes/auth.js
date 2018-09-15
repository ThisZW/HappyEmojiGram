var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', async function (req, res, next) {
    var authReceived = req.body;
    var query = User.findOne({
        email: authReceived.email
    });
    var user = await query.exec();
    if (!user) {
        res.send({
            status: 'error'
        })
        return;
    }
    const match = await bcrypt.compare(authReceived.password, user.password);
    if (match) {
        //TODO login
        res.send({
            status: 'ok'
        })
    } else {
        res.send({
            status: 'error'
        })
    }
});

router.post('/register', async function (req, res, next) {
    var authReceived = req.body;
    if (authReceived.password !== authReceived.password_confirm) {
        res.send({
            status: 'error',
            msg: "password miss matched"
        })
        return;
    }
    var query = User.find({
        email: authReceived.email
    });
    var user = await query.exec();
    if (user.length > 0) {
        res.send({
            status: 'error',
            msg: "email already used"
        })
        return;
    }

    var query = User.find({
        username: authReceived.username
    });
    var user = await query.exec();
    if (user.length > 0) {
        res.send({
            status: 'error',
            msg: "username already used"
        })
        return;
    }
    try {
        await User.create({
            email: authReceived.email,
            username: authReceived.username,
            password: await bcrypt.hash(authReceived.password, saltRounds)
        })
        res.send({
            status: 'ok'
        })
    } catch (e) {
        res.send({
            status: 'error',
            msg: "saving new user failed"
        })
        console.error(e)
    }

});

module.exports = router;