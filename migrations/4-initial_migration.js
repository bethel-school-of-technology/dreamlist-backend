'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "posts"
 * createTable "dreams", deps: []
 *
 **/

var info = {
    "revision": 4,
    "name": "initial_migration",
    "created": "2020-10-10T04:36:16.324Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["posts"]
    },
    {
        fn: "createTable",
        params: [
            "dreams",
            {
                "DreamId": {
                    "type": Sequelize.INTEGER,
                    "field": "DreamId",
                    "primaryKey": true,
                    "autoIncrement": true,
                    "allowNull": false
                },
                "DreamTitle": {
                    "type": Sequelize.STRING,
                    "field": "DreamTitle"
                },
                "DreamBody": {
                    "type": Sequelize.STRING,
                    "field": "DreamBody"
                },
                "UserId": {
                    "type": Sequelize.INTEGER,
                    "field": "UserId",
                    "allowNull": false
                },
                "Deleted": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Deleted",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
