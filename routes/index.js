var express = require('express');
var router = express.Router();
var cluster = require('cluster');
var pass = require('../libs/password');
var jwt = require('jsonwebtoken');
var models = require('../models');
var config = require('../config');

var workers = require('./workers');
var times = require('./times');

router.use("*", function (req, res, next) {
    if (cluster.worker) {
        console.log('I am worker ' + cluster.worker.process.pid);
    }
    next();
});

router.post('/login', (req, res, next) => {
    models.admin.findOne({
        attributes: ["id", "email", "hash_password"],
        where: {
            email: req.body.email
        }
    }).then((admin) => {
        if (admin) {
            pass.verifyPassword(req.body.password, admin.hash_password, (err, verify) => {
                if (err) {
                    next(err);
                } else if (verify === true) {
                    const token = jwt.sign({
                        id: admin.id
                    }, config.get("jwtSecret"), {expiresIn: '1h'});
                    res.send(token);
                } else {
                    next(new Error("Invalid password"));
                }
            })
        } else {
            next(new Error("Invalid credentials"));
        }
    })

});
/*
* api middleware: verify jwt for admin
*/
router.use("*", function (req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, config.get("jwtSecret"), function (err, decoded) {
            if (err) {
                next(err);
            } else {
                req.jwtAdmin = decoded;
                next();
            }
        });
    } else {
        next(new Error("No token provided"));
    }
});

router.use('/workers', workers);
router.use('/times', times);


module.exports = router;

/*
 pass.hashPassword("password", (err, combined) => {
 console.log(err, combined);
 pass.verifyPassword("password", combined, (err, verify) => {
 console.log(err, verify);
 })
 });
 */

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

 router.post('/login', (req, res, next) => {
 passport.authenticate('local', function (err, admin, info) {
 if (err) {
 return next(err);
 }
 if (!admin) {
 return res.status(401).send({message: "Email or password is not correct"});
 }
 req.logIn(admin, function (err) {
 if (err) {
 return next(err);
 }
 req.session.admin = admin;
 return res.send({success: true});
 });
 })(req, res, next);
 });
 */
