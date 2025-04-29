const MessagesSchema = require("../model/messages.model")
const ChatsSchema = require("../model/chats.models")
const {Resend} = require("resend")



class MessagesService {
    async createMessage(sender, receiver, content, chatId){
        const resendInstance = new Resend(process.env.RESEND_API_KEY)
        try{
            const newMessage = await MessagesSchema.create({sender, receiver, content, chatId})
            await ChatsSchema.findByIdAndUpdate(chatId, {lastMessage: newMessage._id})
    
            await newMessage.populate("sender", "-password")
        
            resendInstance.emails.send({
                from: 'onboarding@resend.dev',
                to: 'krishkrishnan2001@gmail.com',
                subject: 'You have a new message!',
                html: '<p>You got a message</p>'
            });

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