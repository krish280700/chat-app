const ChatsSchema = require('../model/chats.models');
const Message = require('../model/messages.model'); // Assuming you have a Message model

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

    async getChatsByUserId(userId) {
        try {
          const chats = await ChatsSchema.find({ participants: userId })
            .populate("participants", "-password")
            .populate("lastMessage")
            .sort({ updatedAt: -1 });
      
          const chatsWithUnread = await Promise.all(
            chats.map(async (chat) => {
              const unreadCount = await Message.countDocuments({
                chatId: chat._id,
                readBy: { $ne: userId } // Not read by this user
              });
      
              return {
                ...chat.toObject(),
                unreadCount,
              };
            })
          );
      
          return chatsWithUnread;
        } catch (err) {
          console.error("Error in getChatsByUserId:", err);
          throw err;
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