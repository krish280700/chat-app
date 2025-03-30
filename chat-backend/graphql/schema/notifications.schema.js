const { gql } = require('apollo-server-express');

const notificationsSchema = gql`
type Notification{
    _id: String
    user: String!
    message: String!
    chatId: String!
    createdAt: String
    isRead: Boolean
}

type Query{
    getUnreadMessages(userId: String!): [Notification!]!
}

type Mutation{
    markNotificationAsRead(_id: String!): Notification!
    sendNotification(userId: String!, messageId: String!): Notification!
}
`