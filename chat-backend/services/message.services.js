const MessagesSchema = require("../model/messages.model")

class MessagesService {
    async createMessage(sender, reciever, content){
        try{
            return await MessagesSchema.create({sender, reciever, content})
        }catch (err){
            console.log(err)
        }
    }

    async getMessagesByChatId(chatId){
        try{
            return await MessagesSchema.find({chatId}).populate("sender", "-password").populate("reciever", "-password")
        }catch(err){
            console.log(err)
        }
    }

    async getMessagesById(id){
        try{
            return await MessagesSchema.findById(id).populate("sender", "-password").populate("reciever", "-password")
        }catch (err){
            console.log(err)
        }
    }

    async updateMessage(id, content){
        try{
            await MessagesSchema.findByIdAndUpdate(id, {content})
        }catch(err){
            console.log(err)
        }
    }

    async deleteMessage(id){
        try{
            await MessagesSchema.findByIdAndDelete(id)
        }catch(err){
            console.log(err)
        }
    }
}


module.exports = new MessagesService()