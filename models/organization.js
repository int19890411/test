/**
 * Created by roman on 23.10.14.
 */
"use strict";

module.exports = function (sequelize, DataTypes) {
    var organization = sequelize.define("organization", {
            worker_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true}, //начальник
            serf_worker_id: {type: DataTypes.INTEGER, allowNull: false, primaryKey: true} //подчиненный
        },
        {
            instanceMethods: {},
            classMethods: {},
            indexes: [
                {
                    name: 'worker_id',
                    fields: ['worker_id']
                },
                {
                    name: 'serf_worker_id',
                    fields: ['serf_worker_id']
                }
            ]
        });
    return organization;
}