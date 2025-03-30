const { gql } = require('apollo-server-express');

const messagesSchema = gql`

type Message{
    _id: String
    sender: String!
    receiver: String!
    chatId: String!
    content: String!
    timestamp: String
    isRead: Boolean
}

type Query{
    getMessages: [Message!]!
    getMessage(_id: String!): Message
    getMessagesByChatId(chatId: String!): [Message!]!
}

type Mutation{
    createMessage(sender: String!, receiver: String!, chatId: String!, content: String!): Message!
    updateMessage(_id: String!, content: String, isRead: Boolean): Message!
    deleteMessage(_id: String!): Message!
}
`

module.exports = messagesSchema