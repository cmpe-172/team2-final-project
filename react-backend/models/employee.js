'use strict';
module.exports = (sequelize, DataTypes) => {
    var Employee = sequelize.define('Employee', {
        emp_no: DataTypes.STRING
    });

    // User.associate = function(models) {
    //     models.User.hasMany(models.Task);
    // };

    return Employee;
};