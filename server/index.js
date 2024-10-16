import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./utils/connectMongoDB.util.js";
import cors from 'cors'
import User from "./models/user.model.js";
import { ApiError } from "./utils/ApiError.util.js";
import { userRouter } from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import { projectRouter } from "./routes/project.route.js";
import issueRouter from "./routes/issue.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting to MongoDb
connectToMongoDB()
  .then(() => {
    console.log(`MongoDB connected successfully\n`);
  })
  .catch((err) => {
    console.log(`Error in connecting to MongoDB\n${err?.message}`);
  });

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project",verifyJWT, projectRouter);
app.use("/api/v1/issue",verifyJWT, issueRouter);

app.listen(PORT, () => {
  console.log(
    `Backend is being served on \n\x1b[36mhttp://localhost:${PORT}\x1b[0m \n`
  );
});
