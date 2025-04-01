const messageService = require('../../services/message.services');

const messageResolvers = {
    Query: {
        getMessagesByChatId: async (_, { chatId }) => await messageService.getMessagesByChatId(chatId),
        getMessage: async (_, { _id }) => await messageService.getMessagesById(_id),
    },

    Mutation: {
        createMessage: async (_, { sender, receiver, content, chatId }) => await messageService.createMessage(sender, receiver, content, chatId),
        updateMessage: async (_, { _id, content, isRead }) => await messageService.updateMessage(_id, content, isRead),
        deleteMessage: async (_, { _id }) => await messageService.deleteMessage(_id)
    }
}

module.exports = messageResolvers