const express = require("express")
const router = express.Router();

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a new chat
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *               messages:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Chat created successfully
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all chats
 *     tags: [Chats]
 *     responses:
 *       200:
 *         description: List of chats
 *       500:
 *         description: Server error
 * /api/chats/{id}:
 *   get:
 *     summary: Get a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat details
 *       404:
 *         description: Chat not found
 *   put:
 *     summary: Update a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *               messages:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Chat updated successfully
 *       404:
 *         description: Chat not found
 *   delete:
 *     summary: Delete a chat by ID
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat deleted successfully
 *       404:
 *         description: Chat not found
 */

const ChatsController = require("../controllers/chats.controllers")

router.post("/chats", ChatsController.createChat)
router.get("/chats", ChatsController.getChats)
router.get("/chats/user/:userId", ChatsController.getChatsByUserId)
router.get("/chats/:id", ChatsController.getChatsById)
router.put("/chats/:id", ChatsController.updateChat)
router.delete("/chats/:id", ChatsController.deleteChat)

module.exports = router
