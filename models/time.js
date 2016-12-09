/**
 * Created by roman on 23.10.14.
 */
"use strict";

var dateFormat = require('dateformat');

module.exports = function (sequelize, DataTypes) {
    var time = sequelize.define("time", {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            //worker_id: {type: DataTypes.INTEGER, allowNull: false},
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            start: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            },
            end: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW
            }
        },
        {
            updatedAt: false,
            createdAt: false,
            classMethods: {
                associate: function (models) {
                    time.belongsTo(models.worker, {foreignKey: 'worker_id', constraints: false});
                }
            },
            instanceMethods: {
                getStringDate: function () {
                    return dateFormat(this.getDataValue('date'), "yyyy-mm-dd");
                },
                getStringStartTime: function () {
                    return dateFormat(this.getDataValue('start'), "HH:MM");
                },
                getStringEndTime: function () {
                    return dateFormat(this.getDataValue('end'), "HH:MM");
                }
            }
            /*indexes: [{
             name: 'worker_id',
             fields: ['worker_id']
             }]*/
        });
    return time;
}