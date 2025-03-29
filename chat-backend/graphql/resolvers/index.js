const { mergeResolvers } = require("@graphql-tools/merge");
const userResolver = require("./users.resolvers");
// const messageResolver = require("./messageResolver");
// const chatResolver = require("./chatResolver");

const resolvers = mergeResolvers([userResolver]);

module.exports = resolvers;