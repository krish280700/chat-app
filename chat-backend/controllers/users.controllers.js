const usersService = require("../services/users.services")

class UsersController {
    async createUser(req, res){
        const {name, email, password} = req.body
        try{
            const user = await usersService.createUser(name, email, password)
            res.status(200).json({message: 'User Created', user })
        }catch (err){
            res.status(500).json(err)
        }
    }

    async getUsers(req, res){
        try{
            const users = await usersService.getUsers()
            res.status(200).json({message: 'All Users', users})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async getUsersByExistingConversation(req, res) {
        const userId = req.params.id;
        console.log(userId, 'users')
        try {
            const users = await usersService.getUsersByExistingConversation(userId);
            res.status(200).json({message: 'All Users', users})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async updateUser(req, res){
        const {id} = req.params
        const {name, email} = req.body
        try{
            await usersService.updateUser(id, name, email)
            res.status(200).json({message: "User Updated"})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async deleteUser(req, res){
        const {id} = req.params
        try{
            await usersService.deleteUser(id)
            res.status(200).json({message: "User Deleted"})
        }catch(err){
            res.status(500).json(err)
        }
    }
}


module.exports = new UsersController()