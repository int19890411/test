"use strict";

var Promise = require("bluebird");

module.exports = {
    up: function (migrations, DataTypes) {
        var tasks = [
            /*migrations.addColumn(
                'users',
                'is_open_lobby',
                {type: DataTypes.INTEGER(1), defaultValue: 0}
            )*/
        ];
        return Promise.all(tasks);
    },

    down: function (migrations, DataTypes) {
        return Promise.resolve();
    }
};
