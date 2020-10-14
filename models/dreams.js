'use strict';
module.exports = (sequelize, DataTypes) => {
    const dreams = sequelize.define('dreams', {
        DreamId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        DreamTitle: DataTypes.STRING,
        DreamBody: DataTypes.STRING,
        UserId: {
            type: DataTypes.INTEGER,
            
            allowNull: false
        },
        Deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

    }, {});
    dreams.associate = function(models) {
        // associations can be defined here
    };
    return dreams;
};