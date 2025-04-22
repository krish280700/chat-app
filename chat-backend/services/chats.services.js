const ChatsSchema = require('../model/chats.models');

class ChatsService {
    async createChat(participants){
        try {
            const chats = await ChatsSchema.create({participants})

            return await chats.populate("participants", "-password")
        }catch(err){
            console.log(err)
        }
    }

    async getChats(){
        try{
            return await ChatsSchema.find().populate("participants", "-password")
        }catch(err){
            console.log(err)
        }
    }

    async getChatsByUserId(userId){
        try{
            return await ChatsSchema.find({participants: userId}).populate("participants", "-password")
        }catch(err){
            console.log(err)
        }
    }

    async getChatsById(id){
        try{
            return await ChatsSchema.findById(id).populate("participants", "-password")
        }catch(err){
            console.log(err)
        }
    }

    async updateChat(id, participants){
        try{
            await ChatsSchema.findByIdAndUpdate(id, {participants})
        }catch(err){
            console.log(err)
        }
    }

    async deleteChat(id){
        try{
            await ChatsSchema.findByIdAndDelete(id)
            return await ChatsSchema.find().populate("participants", "-password")
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new ChatsService();