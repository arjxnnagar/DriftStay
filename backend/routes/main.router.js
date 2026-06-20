import express from "express";
import bookingRouter from "./booking.router.js";
import userRouter from "./user.router.js";
import propertyRouter from "./property.router.js";



const mainRouter = express.Router();

mainRouter.get("/status",(req,res)=>{
    res.send("Server is Live");
})
mainRouter.use("/users",userRouter);
mainRouter.use("/bookings", bookingRouter);
mainRouter.use("/property",propertyRouter);

export default  mainRouter;