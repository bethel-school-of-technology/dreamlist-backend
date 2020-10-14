module.exports = function(models) {
    models.users.hasMany(models.dreams, {
        foreignKey: 'UserId'
    });
    models.dreams.belongsTo(models.users, {
        foreignKey: 'UserId'
    });
}