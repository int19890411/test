var express = require('express');
var router = express.Router();
var cluster = require('cluster');

var workers = require('./workers');
var times = require('./times');

router.use("*", function (req, res, next) {
    if (cluster.worker) {
        console.log('I am worker ' + cluster.worker.process.pid);
    }
    next();
});

/* routes */
router.use('/workers', workers);
router.use('/times', times);


module.exports = router;
