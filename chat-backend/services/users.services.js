const UserSchema = require("../model/users.model")
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