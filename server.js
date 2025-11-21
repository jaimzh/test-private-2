import express from "express";
import cors from "cors"; 
import {makeCommit} from "./helper.js";

//routes
const app = express();
const port = 8081;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res)=> {
    res.json({message: "Hello World!"})
})


app.post('/commit', async (req, res)=> {
    const {message, date} = req.body;

    if (!message || !date){
        return res.status(400).json({success: false, message: "Missing message or date"})
    }
    try{
       await makeCommit(date, message); 
       res.json({success: true, message: "Commit successful"})
    }catch (error){
        console.error(error);
        res.status(500).json({success: false, message: "Failed to commit"})
    }
})


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`)
})