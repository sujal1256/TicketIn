import express from "express";
import dotenv from 'dotenv'

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Home page')
})



app.listen(PORT, () => {
    console.log(`Backend is being served on \nhttp://localhost:${PORT}`);
    
})