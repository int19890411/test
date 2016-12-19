/**
 * Created by roman on 23.10.14.
 */
"use strict";
//var passportLocalSequelize = require('passport-local-sequelize');

module.exports = function (sequelize, DataTypes) {
    var admin = sequelize.define("admin", {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            email: {type: DataTypes.STRING, allowNull: false},
            hash_password: {type: DataTypes.STRING(5000), allowNull: false},
            //salt_password: {type: DataTypes.STRING, allowNull: false}
        });
    /*passportLocalSequelize.attachToUser(admin, {
        usernameField: 'email',
        hashField: 'hash_password',
        saltField: 'salt_password',
        iterations: 1000,
        keylen: 64
    });*/
    return admin;
}