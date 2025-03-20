const express = require("express")
const router = express.Router();
const MessagesController = require("../controllers/messages.controllers")


// Message Routes

router.post("/messages", MessagesController.createMessage)
router.get("/messages/chat/:id", MessagesController.getMessagesByChatId)
router.get("/messages/:id", MessagesController.getMessagesById)
router.put("/messages/:id", MessagesController.updateMessage)
router.delete("/messages/:id", MessagesController.deleteMessage)

module.exports = router
