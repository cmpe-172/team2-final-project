'use strict';

// var fs        = require('fs');
// var path      = require('path');
var Sequelize = require('sequelize');
// var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require('../config/config.json')[env]; //require(__dirname + '/../config/config.json')[env];
var db        = {};
//
// // if (config.use_env_variable) {
// //   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// // } else {
// //   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// // }
//
// var sequelize = new Sequelize(config.database, config.username, config.password, config);
//
//
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     var model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });
//
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

var sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
db.employee = require('./employee')(sequelize, Sequelize);

module.exports = db;
