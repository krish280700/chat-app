const express = require("express")
const router = express.Router();
const ChatsController = require("../controllers/chats.controllers")
// const UsersController = require("../controllers/users.controllers")

// Chats Routes

router.post("/chats", ChatsController.createChart)
router.get("/chats", ChatsController.getChats)
router.get("/chats/:id", ChatsController.getChatsById)
router.put("/chats/:id", ChatsController.updateChat)
router.delete("/chats/:id", ChatsController.deleteChat)

module.exports = router
