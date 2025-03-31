const messageService = require('../../services/message.services');

const messageResolvers = {
    Query: {
        getMessagesByChatId: async (_, { chatId }) => await messageService.getMessagesByChatId(chatId),
        getMessage: async (_, { _id }) => await messageService.getMessagesById(_id),
    },

    Mutation: {
        createMessage: async (_, { sender, receiver, content, chatId }) => await messageService.createMessage(sender, receiver, content, chatId),
        updateMessage: async (_, { id, content, isRead }) => await messageService.updateMessage(id, content, isRead),
        deleteMessage: async (_, { id }) => await messageService.deleteMessage(id)
    }
}

module.exports = messageResolvers