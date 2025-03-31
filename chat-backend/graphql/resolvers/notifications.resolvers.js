const notificationsService = require('../../services/notification.services');

const notificationResolvers = {
    Query: {
        getUnreadMessages: async (_, { userId }) => await notificationsService.getUnreadMessages(userId),
    },

    Mutation: {
        sendNotification: async (_, { userId, messageId }) => await notificationsService.sendNotification(userId, messageId),
        markNotificationAsRead: async (_, { id }) => await notificationsService.markAsRead(id)
    }
}