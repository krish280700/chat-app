const chatsService = require('../../services/chats.services');

const chatResolvers = {
    Query: {
        getChats: async () => await chatsService.getChats(),
        getChat: async (_, { _id }) => await chatsService.getChatsById(_id),
    },

    Mutation: {
        createChat: async (_, { participants }) => await chatsService.createChat(participants),
        updateChat: async (_, { _id, participants }) => await chatsService.updateChat(_id, participants),
        deleteChat: async (_, { _id }) => await chatsService.deleteChat(_id),
    },
};

module.exports = chatResolvers;