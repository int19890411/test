var express = require('express');
var router = express.Router();
var models = require("../models");
var util = require("../libs/util");

/* GET listing */
router.get('/', function (req, res, next) {
    var page = 1,
        limit = 10;
    var countTimes = 0;
    if (!isNaN(req.query.page)) {
        page = parseInt(req.query.page, 10);
    }
    var where = {};
    if (req.query.worker_id) {
        where.worker_id = req.query.worker_id;
    }
    models.time.count({where: where}).then(function (count) {
        countTimes = count;
        return models.time.findAll({
            where: where,
            include: [models.worker],
            limit: util.getLimit(page, limit)
        })
    }).then(function (times) {
        res.send({
            title: 'TimeTable',
            times: times,
            query: req.query,
            page: page,
            pageCount: Math.floor(1 + countTimes / limit)
        });
    }).catch(function (err) {
        next(err);
    });
});

/* GET by id */
router.get('/:id', function (req, res, next) {
    models.time.findOne({
        include: [models.worker],
        where: {id: req.params.id}
    }).then(function (time) {
        if (time) {
            res.send(time);
        } else {
            res.status(404).send('Not found time');
        }
    }).catch(function (err) {
        next(err);
    });
});

/* POST delete by id */
router.post('/:id/delete', function (req, res, next) {
    models.time.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.send({success: true});
    })
})

/* POST save object by id */
router.post('/:id/save', function (req, res, next) {
    models.time.findById(req.params.id).then(function (object) {
        if (object) {
            object.date = new Date(req.body.date);
            object.start = new Date(req.body.start);
            object.end = new Date(req.body.end);
            /*for (var p in req.body) {
             if (object[p] != null && typeof object[p].getMonth === 'function') {
             object[p] = new Date(req.body[p]);
             } else {
             object[p] = req.body[p];
             }
             }*/
            return object.save();
        } else {
            return util.promiseError("Not found time", 404);
        }
    }).then(function (time) {
        res.send(time);
    }).catch(function (err) {
        next(err);
    });
});

/* POST add new time */
router.post('/create', function (req, res, next) {
    models.worker.findOrCreate({
        where: {
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name
        },
        defaults: {sex: req.body.sex}
    }).spread(function (worker) {
        models.time.create({
            date: new Date(req.body.date),
            start: new Date(req.body.start),
            end: new Date(req.body.end),
            worker_id: worker.id
        }).then(function (time) {
            time.dataValues.worker = worker.dataValues;
            res.send(time);
        }).catch(function (err) {
            next(err);
        })
    })
})


module.exports = router;
