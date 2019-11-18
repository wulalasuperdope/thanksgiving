const { STRING, BOOLEAN } = require('sequelize');
const { db } = require('../connection');

const Person = db.define('person', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true,
    },
    isAttending: {
        type: BOOLEAN,
        defaultValue: false,
    }
});

module.exports = { Person };
