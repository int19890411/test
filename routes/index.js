var express = require('express');
var router = express.Router();
var cluster = require('cluster');
var passport = require('passport');
var models = require('../models');

var workers = require('./workers');
var times = require('./times');

router.use("*", function (req, res, next) {
    if (cluster.worker) {
        console.log('I am worker ' + cluster.worker.process.pid);
    }
    next();
});

//must be only root
/*
router.get('/register', (req, res, next) => {
    models.admin.register("admin@mail.com", "password", (err, registeredAdmin) => {
        if (err) {
            return next(err);
        }
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.send({success: true});
            });
        });
    });
});
*/

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, admin, info) {
        if (err) {
            return next(err);
        }
        if (!admin) {
            return res.status(401).send({error: "Not found admin"});
        }
        req.logIn(admin, function (err) {
            if (err) {
                return next(err);
            }
            return res.send({success: true});
        });
    })(req, res, next);
});

router.use('/workers', workers);
router.use('/times', times);


module.exports = router;
