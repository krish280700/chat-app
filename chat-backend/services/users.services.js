const UserSchema = require("../model/users.model")
const ChatsSchema = require("../model/chats.models")
const bcrypt = require("bcryptjs")

class UsersService {
    async createUser(name, email, password){
        try {
            return await UserSchema.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            })
        }
        catch (error){
            console.log(error)
        }
    }

    async getUsers(){
        try{
            return await UserSchema.find().select("-password")
        }catch (err){
            console.log(err)
        }
    }

    async getUsersById(id){
        console.log('jksjs', id)
        try{
            return await UserSchema.findById(id).select("-password")
        }catch(err){
            console.log(err)
        }
    }

    async getUsersByExistingConversation(userId) {      
        try {
          // Step 1: Get all chats that the user is a participant of
          const chats = await ChatsSchema.find({ participants: userId });
      
          // Step 2: Collect all participant IDs (excluding the user)
          const existingUserIds = new Set();
          chats.forEach(chat => {
            chat.participants.forEach(participantId => {
              if (participantId.toString() !== userId) {
                existingUserIds.add(participantId.toString());
              }
            });
          });
      
          // Also exclude the user themselves
          existingUserIds.add(userId);
      
          // Step 3: Find all users not in that set
          const users = await UserSchema.find({
            _id: { $nin: Array.from(existingUserIds) }
          });
          return users;
        } catch (err) {
            console.error('Error fetching users without existing chat:', err);
        }
    }
    

    async updateUser(id, name, email){
        try{
            return await UserSchema.findByIdAndUpdate(id, {name, email})  
        }catch(err){
            console.log(err)
        }
    }

    async deleteUser(id){
        try{
            await UserSchema.findByIdAndDelete(id)
            return UserSchema.find().select("-password")
        }catch(err){
            console.logb(err)
        }
    }
}

module.exports = new UsersService();