const MessagesService = require("../services/message.services")

class MessagesController {
    async createMessage(req, res){
        const {sender, receiver, content, chatId} = req.body
        try{
            const message = await MessagesService.createMessage(sender, receiver, content, chatId)
            res.status(200).json({message: "Message Created", message})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async getMessagesByChatId(req, res){
        const {id} = req.params
        console.log(id, 'sjmjs')
        try{
            const messages = await MessagesService.getMessagesByChatId(id)
            res.status(200).json({message: "All Messages", messages})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async getMessagesById(req, res){
        const {id} = req.params
        try{
            const message = await MessagesService.getMessagesById(id)
            if(message) res.status(200).json({message: "Message Found", message})
            else res.status(404).json({message: "Message Not Found"})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async updateMessage(req, res){
        const {id} = req.params
        const {content} = req.body
        try{
            await MessagesService.updateMessage(id, content)
            res.status(200).json({message: "Message Updates"})
        }catch(err){
            res.status(500).json(err)
        }
    }
    
    async deleteMessage(req, res){
        const {id} = req.params
        try{
            await MessagesService.deleteMessage(id)
            res.status(200).json({message: "Message Deleted"})
        }catch(err){
            res.status(500).json(err)
        }
    }
}

module.exports = new MessagesController()