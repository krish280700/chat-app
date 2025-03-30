const {mergeTypeDefs} = require('@graphql-tools/merge');

const usersSchema = require('./users.schema.js')
const notificationsSchema = require('./notifications.schema.js')
const chatsSchema = require('./chats.schema.js')
const messagesSchema = require('./messages.schema.js')

const typeDefs = mergeTypeDefs([usersSchema, notificationsSchema, chatsSchema, messagesSchema], {
    all: true,
});


module.exports = typeDefs;