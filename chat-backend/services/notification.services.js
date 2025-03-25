const { errorMonitor } = require('node:events')
const NotificationSchema = require('../model/notifications.models')

class NotificationService{
    getUnreadMessages(userId){
        try{
            return NotificationSchema.find({user: userId, isRead: false}).populate("message")
        }catch(err){
            console.log(err)
        }
    }

    sendNotification(user, message){
        try{
            return NotificationSchema.create({user, message}).sort({ createdAt: -1 })
        }catch(err){
            console.log(err)
        }
    }

    markAsRead(id){
        try{
            return NotificationSchema.findByIdAndUpdate(id, {isRead: true})
        }catch(err){
            console.log(err)
        }
    }
}   

module.exports = new NotificationService()