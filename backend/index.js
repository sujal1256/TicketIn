import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./utils/connectMongoDB.util.js";
import User from './models/user.model.js'
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

// testing user methods
// const user = await User.create({
//     username:"sujalmalhotra",
//     email:"sujal2@gmail.com",
//     password: "pass1243"
// })

// user.isPasswordCorrect('pass123').then(res => console.log(res)
// )



app.listen(PORT, () => {
  console.log(`Backend is being served on \n\x1b[36mhttp://localhost:${PORT}\x1b[0m \n`);
});
