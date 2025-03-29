const { gql } = require('apollo-server-express');

const usersSchema = gql`
type User{
    _id: String
    name: String!
    email: String!
    createdAt: String
}

type Query{
    getUsers: [User!]!
    getUser(_id: String!): User
}

type Mutation{
    createUser(name: String!, email: String!, password: String!): User!
    updateUser(_id: String!, name: String, email: String): User!
    deleteUser(id: ID!): User!
}`;

module.exports = usersSchema