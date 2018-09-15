var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User')
require('../passport.config')(passport);
var jwt = require('jsonwebtoken');

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

    // check if password matches
    user.comparePassword(authReceived.password, function (err, isMatch) {
        if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.session.secret, {
                expiresIn: "7d"
            });
            // return the information including token as JSON
            res.send({
                status: 'ok',
                token: 'JWT ' + token
            });
        } else {
            res.send({
                status: 'error'
            })
            return;
        }
    });
});

router.post('/register', async function (req, res, next) {
    var authReceived = req.body;
    if (!authReceived.email || !authReceived.password || !authReceived.username || authReceived.email.length == 0 || authReceived.username.length == 0) {
        res.send({
            status: 'error',
            msg: 'missing field.'
        });
        return;
    }
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

    var newUser = new User({
        email: authReceived.email,
        username: authReceived.username,
        password: authReceived.password
    });
    newUser.save(function (err) {
        if (err) {
            res.send({
                status: 'error',
                msg: "database error"
            })
            res.end()
            return;
        }
        res.send({
            status: 'ok'
        })
        res.end()
    });
});


router.get('/whoami', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    res.send({
        username: req.user.username
    });
});

module.exports = router;