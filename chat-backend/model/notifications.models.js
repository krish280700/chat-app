const mongoose = require("mongoose");
const { type } = require("os");

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: mongoose.Schema.Types.ObjectId, ref: "Message", required: true },
    isRead: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  });
  
module.exports = mongoose.model("Notification", NotificationSchema);