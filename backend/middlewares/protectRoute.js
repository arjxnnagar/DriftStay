import jwt from "jsonwebtoken";
import  prisma  from "../configs/prisma.js";

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized request",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }
};

export default protect;
