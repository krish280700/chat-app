const { mergeResolvers } = require("@graphql-tools/merge");
const userResolver = require("./users.resolvers");
const notificationResolver = require("./notifications.resolvers");
const chatResolver = require("./chats.resolvers");
const messageResolver = require("./messages.resolvers");

const resolvers = mergeResolvers([userResolver, notificationResolver, chatResolver, messageResolver]);

module.exports = resolvers;