var express = require('express');
var router = express.Router();
var models = require("../models");
var util = require("../libs/util");

/* GET workers listing */
router.get('/', function (req, res, next) {
    var page = 1,
        limit = 10;
    var countTimes = 0;
    if (!isNaN(req.query.page)) {
        page = parseInt(req.query.page, 10);
    }
    var where = {};
    models.worker.count({where: where}).then(function (count) {
        countTimes = count;
        return models.worker.findAll({
            where: where,
            limit: util.getLimit(page, limit)
        })
    }).then(function (workers) {
        res.send({
            title: 'Workers',
            workers: workers,
            query: req.query,
            page: page,
            pageCount: Math.floor(1 + countTimes / limit)
        });
    }).catch(function (err) {
        next(err);
    });
});

/* GET worker by id */
router.get('/:id', function (req, res, next) {
    models.worker.findById(req.params.id).then(function (worker) {
        res.send(worker);
    }).catch(function (err) {
        next(err);
    });
})

/* DELETE worker by id */
router.post('/:id/delete', function (req, res, next) {
    models.worker.destroy({
        where: {
            id: req.params.id
        }
    }).then(function () {
        res.send({success: true});
    }).catch(function (err) {
        next(err);
    });
})

/* FIND worker by last_name */
router.post('/find', function (req, res, next) {
    models.worker.findOne({
        where: {
            last_name: {
                $like: "%" + req.body.last_name + "%"
            }
        }
    }).then(function (worker) {
        res.send(worker);
    }).catch(function (err) {
        next(err);
    });
})

/* SAVE OR CREATE worker */
router.post('/:id/save', function (req, res, next) {
    models.worker.findById(req.params.id).then(function (object) {
        if (object) {
            object.first_name = req.body.first_name;
            object.middle_name = req.body.middle_name;
            object.last_name = req.body.last_name;
            object.sex = req.body.sex;
            object.contact = req.body.contact;
            return object.save();
        } else {
            if (req.body.id) {
                delete req.body.id;
            }
            return models.worker.create(req.body);
        }
    }).then(function (worker) {
        res.send(worker);
    }).catch(function (err) {
        next(err);
    });
})


module.exports = router;
