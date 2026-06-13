import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mainRouter from "./routes/main.router.js";


import { configDotenv } from "dotenv";
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"*"}));


app.use("/",mainRouter);


app.listen(PORT,()=>{
    console.log(`Server is live on port http://localhost:${PORT}`);
});