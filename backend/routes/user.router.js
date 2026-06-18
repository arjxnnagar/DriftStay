import express from "express";
import { getMe, google, login, signup } from "../controllers/userController.js";
import passport from "passport";
import { Strategy } from "passport-google-oidc";
import protect from "../middlewares/protectRoute.js"

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
// userRouter.get("/all", getUsers);

export default userRouter;
