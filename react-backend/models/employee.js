'use strict';
module.exports = (sequelize, DataTypes) => {
    var Employee = sequelize.define('employee', {
        emp_no: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        // gender: DataTypes.ENUM('M','N'), // Skip this attribute.
        birth_date: DataTypes.DATE,
        hire_date: DataTypes.DATE
    });

    // User.associate = function(models) {
    //     models.User.hasMany(models.Task);
    // };
// OR:
    // Reservation.associate = function(models) {
    //     Reservation.belongsTo(models.Hotel);
    //     Reservation.hasOne(models.Payment,{ foreignKey: 'reservation_id' });
    //     Reservation.belongsTo(models.user,{
    //         foreignKey: 'user_id',
    //         onDelete: 'CASCADE'
    //     });
    // };

    return Employee;
};