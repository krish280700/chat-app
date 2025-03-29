const {mergeTypeDefs} = require('@graphql-tools/merge');

const usersSchema = require('./users.schema.js')

const typeDefs = mergeTypeDefs([usersSchema]);


module.exports = typeDefs;