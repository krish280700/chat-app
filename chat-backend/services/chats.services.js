const ChatsSchema = require('../model/chats.models');

class ChatsService {
    async createChat(participants){
        try {
            return await ChatsSchema.create({participants}).populate("participants", "-password")
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
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new ChatsService();