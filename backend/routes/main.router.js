import express from "express";


const mainRouter = express.Router();

mainRouter.get("/status",(req,res)=>{
    res.send("Server is Live");
})



export default  mainRouter;