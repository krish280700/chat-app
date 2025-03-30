const chatsService = require('../../services/chats.services');

const chatResolvers = {
    Query: {
        getChats: async () => await chatsService.getChats(),
        getChat: async (_, { id }) => await chatsService.getChatsById(id),
    },

    Mutation: {
        createChat: async (_, { participants }) => await chatsService.createChat(participants),
        updateChat: async (_, { id, participants }) => await chatsService.updateChat(id, participants),
        deleteChat: async (_, { id }) => await chatsService.deleteChat(id),
    },
};

module.exports = chatResolvers;