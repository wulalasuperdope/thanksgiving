const { STRING } = require('sequelize');
const { db } = require('../connection');

const Dish = db.define('dish', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: STRING,
        allowNull: false,
        unique: true,
    }
});

module.exports = { Dish };
