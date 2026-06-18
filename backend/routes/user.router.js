import express from "express";
import { getMe, google, login, makeHost, signup } from "../controllers/userController.js";
import passport from "passport";
import { Strategy } from "passport-google-oidc";
import protect from "../middlewares/protectRoute.js"
import { useTransition } from "react";

const userRouter = express.Router();
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.get("/google", passport.authenticate("google"));
userRouter.get(
  "/google/callback",
  passport.authenticate("google",{
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/auth`,
  }),
  google,
);
userRouter.get("/me",protect,getMe);
userRouter.post("/makehost",protect,makeHost);

// userRouter.get("/all", getUsers);

export default userRouter;
