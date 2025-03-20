const chatsService = require("../services/chats.services")

class ChatsController {
    async createChat(req, res) {
       const {participants} = req.body
       try{
            const chat  = await chatsService.createChat(participants)
            res.status(200).json({message: 'Chat Created', chat})
       }catch(err){
            res.status(500).json(err)
       }
    }

    async getChats(req, res){
        try{
            const chats = await chatsService.getChats()
            res.status(200).json({message: 'All Chats', chats})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async getChatsById(req, res){
        const {id} = req.params
        try{
            const chat = await chatsService.getChatsById(id)
            if(chat){
                res.status(200).json({message: "chat Found", chat})
            }else{
                res.status(404).json({message: "chat Not Found"})
            }
        }catch(err){
            res.status(500).json(err)
        }
    }

    async updateChat(req, res){
        const {id} = req.params
        const {participants} = req.body
        try{
            await chatsService.updateChat(id, participants)
            res.status(200).json({message: "Chat Updates"})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async deleteChat(req, res){
        const {id} = req.params
        try{
            await chatsService.deleteChat(id)
            res.status(200).json({message: "Chat Deleted"})
        }catch(err){
            res.status(500).json(err)
        }
    }
}

module.exports = new ChatsController()