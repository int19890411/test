/**
 * Created by roman on 23.10.14.
 */
"use strict";
var dateFormat = require('dateformat');

module.exports = function (sequelize, DataTypes) {
    var worker = sequelize.define("worker", {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            first_name: {type: DataTypes.STRING, allowNull: false},
            middle_name: {type: DataTypes.STRING, allowNull: false},
            last_name: {type: DataTypes.STRING, allowNull: false},
            sex: {type: DataTypes.ENUM('male', 'female'), allowNull: false},
            contact: DataTypes.STRING(4000) //можно и TEXT, но если не ошибаюсь новый mysql выделяет память по содержимому, а не по выделенному кол. символов VARCHAR
        },
        {
            instanceMethods: {},
            indexes: [
                {
                    name: 'last_name',
                    fields: ['last_name']
                },
                {
                    name: 'createdAt',
                    fields: ['createdAt']
                }
            ]
        });
    return worker;
}