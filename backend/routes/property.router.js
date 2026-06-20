import express from "express";
import protect from "../middlewares/protectRoute.js";
import { addProperty, getAllProperties, getMyProperties } from "../controllers/propertiesController.js";
import upload from "../configs/multer.js";

const propertyRouter = express.Router();

propertyRouter.get("/all",getAllProperties);
propertyRouter.get("/myprop/:id",protect,getMyProperties);
propertyRouter.post("/:id",protect,upload.array("photos",5),addProperty);

export default propertyRouter;




