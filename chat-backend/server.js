const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");
const cors = require("cors");
const connectDB = require("./config/db")
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

require("dotenv").config();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chat API",
      version: "1.0.0",
      description: "API documentation for the Chat application",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const swaggerUiOptions = {
  explorer: true,
};
const swaggerUiSetup = swaggerUi.setup(swaggerDocs, swaggerUiOptions);
const swaggerUiRoute = swaggerUi.serve;
const swaggerUiPath = "/api-docs";




const app = express();
app.use(cors());
app.use(express.json());
app.use(swaggerUiPath, swaggerUiRoute, swaggerUiSetup);

// Import Users Routes
const usersRoutes = require("./routes/users.routes")
app.use("/api", usersRoutes)

// Import Chats Routes
const chatsRoutes = require("./routes/chats.routes")
app.use("/api", chatsRoutes)

// Import Messages Routes
const messagesRoutes = require("./routes/messages.routes")
app.use("/api", messagesRoutes)

// Import Auth Routes
const authRoutes = require("./routes/auth.routes")
app.use("/api", authRoutes)

// Test Route
app.get("/", (req, res) => res.send("Chat API Running..."));

connectDB()
// Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
