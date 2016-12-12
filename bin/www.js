#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('test:server');
var http = require('http');
var Umzug = require('umzug');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var logger = require('../libs/winston');
var config = require('../config');

var models = require("../models");

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var httpServer = http.createServer(app);

if (config.get("cluster")) {
    startCluster(); // SpeedUp app
} else {
    start();
}

var umzug = new Umzug({
    storage: 'sequelize',

    storageOptions: {
        sequelize: models.sequelize
    },

    migrations: {
        params: [models.sequelize.getQueryInterface(), models.sequelize.constructor, function () {
            throw new Error('Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.');
        }],
        path: './migrations',
        pattern: /\.js$/
    }
});

function start() {
    console.log("START");
    models.sequelize.sync({force: false}).then(function () {
        umzug.up().then(function (migrations) {
            httpServer.listen(port, function () {
                logger.info('Server http listening on port ' + httpServer.address().port);
            });
        });
    }).catch(function (err) {
        logger.error(err);
    });
}
function startCluster() {
    if (cluster.isMaster) {
        console.log("Start cluster master");
        models.sequelize.sync({force: false}).then(function () {
            umzug.up().then(function (migrations) {
                // Fork workers.
                for (var i = 0; i < numCPUs; i++) {
                    cluster.fork();
                }

                cluster.on('listening', function (worker, address) {
                    logger.info("A worker " + worker.process.pid + " is now connected to :" + address.port);
                });

                cluster.on('disconnect', function (worker) {
                    console.log('The worker #' + worker.id + ' has disconnected');
                    worker.kill();
                });

                cluster.on('exit', onExitWorker);

                Object.keys(cluster.workers).forEach(function (id) {
                    cluster.workers[id].on('message', onMessageHandler);
                });
            });
        }).catch(function (err) {
            logger.error(err.message);
        });
    } else {
        httpServer.listen(port, function () {
            logger.info('Server http listening on port ' + httpServer.address().port);
        });
    }
}
/*������� ������� ������ ������� cluster.worker.send({killWorkers: true}) ������ worker ��������������� ���������. ����� ������� ������ ������ ������.*/
var onExitWorker = function (worker, code, signal) {
    if (worker.suicide === true) {
        logger.info(new Date() + ' Worker committed suicide ' + signal);
        var w = cluster.fork();
        //w.on('exit', onExitWorker);
        w.on('message', onMessageHandler);
    } else {
        logger.info('worker ' + worker.process.pid + ' died');
    }
};
var onMessageHandler = function (msg) {
    //console.log('Worker to master: ', msg);
    if (msg.killWorkers) {
        var i = 0;
        var workers = Object.keys(cluster.workers);

        var f = function () {
            //console.log("Count workers:" +workers.length);

            if (i == workers.length) return;

            cluster.workers[workers[i]].disconnect();

            var timeout = setTimeout(function () {
                cluster.workers[workers[i]].kill();
            }, 5000);

            cluster.workers[workers[i]].on("disconnect", function () {
                clearTimeout(timeout);
            });

            i++;
            setTimeout(f, 2000);
        }()
        f();
    }
}

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

