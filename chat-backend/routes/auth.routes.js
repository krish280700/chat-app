const express = require("express")
const router = express.Router();
const AuthController = require("../controllers/auth.controllers")


/**
 * @swagger
 * /auth/login:
 *    post:
 *      summary: Login a user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:  
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        200:
 *          description: Login successful
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      email:
 *                        type: string
 *        400:
 *          description: Bad request
 *        500:
 *          description: Server error
 */

router.post("/login", AuthController.login)
router.post("/register", AuthController.register)   

module.exports = router
