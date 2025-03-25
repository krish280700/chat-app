const NotificationService = require('../services/notification.services')


class NotificationController{
    async getUnreadNotifications(req, res){
        try{
            const {userId, chatId} = req.params
            const notifications = await NotificationService.getUnreadMessages(userId)
            res.status(200).json({message: "All Unread Notifications", notifications})
        }catch(err){
            res.status(500).json(err)
        }
    }

    async sendNotification(req,res){
        try{
            const {user, message} = req.body
            const notification = await NotificationService.sendNotification(user, message)
            res.status(200).json({message: "Notification Sent", notification})
        }catch(err){
            console.log(err)
        }
    }

    async markAsRead(req, res){
        try{
            const {id} = req.params
            await NotificationService.markAsRead(id)
            res.status(200).json({message: "Notification Marked as Read"})
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new NotificationController()