const messageService = require('../../services/messages.service');

const messageResolvers = {
    Query: {
        getMessagesByChatId: async (_, { chatId }) => await messageService.getMessagesByChatId(chatId),
        getMessage: async (_, { id }) => await messageService.getMessagesById(id),
        getMessages: async () => await messageService.getMessages()
    },

    Mutation: {
        createMessage: async (_, { sender, receiver, content, chatId }) => await messageService.createMessage(sender, receiver, content, chatId),
        updateMessage: async (_, { id, content, isRead }) => await messageService.updateMessage(id, content, isRead),
        deleteMessage: async (_, { id }) => await messageService.deleteMessage(id)
    }
}

module.exports = messageResolvers