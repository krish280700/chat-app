const MessagesSchema = require("../model/messages.model")
const ChatsSchema = require("../model/chats.models")

class MessagesService {
    async createMessage(sender, receiver, content, chatId){
        try{
            const newMessage = await MessagesSchema.create({sender, receiver, content, chatId})
            await ChatsSchema.findByIdAndUpdate(chatId, {lastMessage: newMessage._id})
    
            await newMessage.populate("sender", "-password")
            return await newMessage.populate("receiver", "-password")
        }catch (err){
            console.log(err)
        }
    }

    async getMessagesByChatId(chatId){
        try{
            return await MessagesSchema.find({chatId}).populate("sender", "-password").populate("receiver", "-password")
        }catch(err){
            console.log(err)
        }
    }

    async getMessagesById(id){
        try{
            return await MessagesSchema.findById(id).populate("sender", "-password").populate("receiver", "-password")
        }catch (err){
            console.log(err)
        }
    }

    async updateMessage(id, content){
        try{
            const updateMsg = await MessagesSchema.findByIdAndUpdate(id, {content})
            await updateMsg.populate("sender", "-password")
            return await updateMsg.populate("receiver", "-password")
        }catch(err){
            console.log(err)
        }
    }

    async updateAllMessagesReadStatusInChat(chatId, userId){
        try{
            const update =  await MessagesSchema.updateMany(
                { chatId, receiver: userId, isRead: false },
                { $set: { isRead: true } }
            )

            return update
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