const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = require("../model/users.model")
const UsersService = require("./users.services")

const { JWT_SECRET } = process.env 

class AuthService {
    async login(email, password){
        try {
            const user = await UserSchema.findOne({email})
            if(!user) throw new Error("User not found")
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) throw new Error("Invalid credentials")
            const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "1h"})
            return {token, user}
        }catch(err){
            console.log(err)
        }
    }

    async register(name, email, password){
        try {
            const user = await UserSchema.findOne({email})
            if(user) throw new Error("User already exists")
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = await UserSchema.create({name, email, password: hashedPassword})
            const token = jwt.sign({id: newUser._id}, JWT_SECRET, {expiresIn: "1h"})
            return {token, user: newUser}
        }catch(err){
            console.log(err)
        }
    }
    async getUserById(id){
        try{
            return await UsersService.getUsersById(id)
        }catch(err){
            console.log(err)
        }
    }   
}

module.exports = new AuthService()
