import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../configs/prisma.js";
import generateToken from "../configs/jwt.js";

import passport from "passport";
import GoogleStrategy from "passport-google-oidc";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing Credentials" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: hashedPass,
      },
    });

    const token = generateToken(newUser.id);
    res.status(200).json({ token, newUser, message: "Signup Successfull" });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Missing Credentials" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }

    const verify = await bcrypt.compare(password, user.passwordHash);
    if (!verify) {
      return res.status(400).json({ message: "Invaild Credentials" });
    }

    const token = generateToken(user.id);
    res.status(200).json({ token, user, message: "Login Successfull" });
  } catch (err) {
    console.log(err);
  }
};

export const google = async (req, res) => {
  const token = generateToken(req.user.id);
  res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
};


export const getMe = async (req,res)=>{

  try {
    return res.json(req.user);
  } catch (err) {
    console.log(err);
  }
}

export const makeHost = async (req,res)=>{

  try {
    const user = req.user;
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: "HOST",
      },
    });
    return res.status(200).json({
      message: "User is now a host",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
  }
}
