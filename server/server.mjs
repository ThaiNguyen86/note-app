import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";

import {typeDefs} from "./schemas/index.js";
import {resolvers} from "./resolvers/index.js";

import "dotenv/config";

const app = express();
const httpServer = http.createServer(app);


//Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@note-app.fotgp.mongodb.net/?retryWrites=true&w=majority&appName=note-app`;
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose
  .connect(URI)
  .then(async () => {
    console.log("Connected to the database");
    await new Promise((resolve) => httpServer.listen(PORT, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
