const Sequelize = require('sequelize');

module.exports = function(sequelize,DataTypes){
    const Grad = sequelize.define('grad', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        naziv: Sequelize.STRING,
        broj_stanovnika: Sequelize.INTEGER,
     }, { freezeTableName: true });

    return Grad;
};
