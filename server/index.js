import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./utils/connectMongoDB.util.js";
import cors from "cors";
import { userRouter } from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/auth.middleware.js";
import { projectRouter } from "./routes/project.route.js";
import issueRouter from "./routes/issue.route.js";
import { checkInvitedUser } from "./controllers/project.controller.js";
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

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
// FIXME: this is made here because I donot want to verify JWT here
app.route("/invite").get(checkInvitedUser);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/project", verifyJWT, projectRouter);
app.use("/api/v1/issue", verifyJWT, issueRouter);

app.listen(PORT, () => {
  console.log(
    `Backend is being served on \n\x1b[36mhttp://localhost:${PORT}\x1b[0m \n`
  );
});
