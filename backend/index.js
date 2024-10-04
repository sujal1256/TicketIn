import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./utils/connectMongoDB.util.js";
import User from "./models/user.model.js";
import { ApiError } from "./utils/ApiError.util.js";
import { userRouter } from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import { verifyJWT } from "./middlewares/auth.middleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Home page");
});

// Connecting to MongoDb
connectToMongoDB()
  .then((mongo) => {
    console.log(`MongoDB connected successfully\n`);
  })
  .catch((err) => {
    console.log(`Error in connecting to MongoDB\n${err?.message}`);
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.get("/", verifyJWT, (req, res) => res.send("Home page"));
app.get('/checkJWT', verifyJWT, (req, res)=>{
  res.send("checking JWT")
})
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.log(
    `Backend is being served on \n\x1b[36mhttp://localhost:${PORT}\x1b[0m \n`
  );
});

// testing user methods
// const user = await User.create({
//     username:"sujalmalhotra",
//     email:"sujal2@gmail.com",
//     password: "pass1243"
// })

// user.isPasswordCorrect('pass123').then(res => console.log(res)
// )
