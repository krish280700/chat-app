const UserServices = require('../../services/users.services')

const userResolvers = {
    Query: {
        getUsers: async() => await UserServices.getUsers(),
        getUser: async(_, {_id}) => await UserServices.getUsersById(_id)       

    },

    Mutation: {
        createUser: async(_, {name, email, password}) => await UserServices.createUser(name, email, password),
        updateUser: async(_, {_id, name, email}) => await UserServices.updateUser(_id, name, email),
        deleteUser: async(_, {_id}) => await UserServices.deleteUser(_id)
    }
}

module.exports = userResolvers;