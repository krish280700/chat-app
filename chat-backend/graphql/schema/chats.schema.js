const { gql } = require('apollo-server-express');

const chatsSchema = gql`

type Chat{
    _id: String
    participants: [User!]!
    lastMessage: String
    updatedAt: String
}

type Query{
    getChats: [Chat!]!
    getChat(_id: String!): Chat
}

type Mutation{
    createChat(participants: [String!]!): Chat!
    updateChat(_id: String!, participants: [String!]!): Chat!
    deleteChat(_id: String!): Chat!
}
`

module.exports = chatsSchema