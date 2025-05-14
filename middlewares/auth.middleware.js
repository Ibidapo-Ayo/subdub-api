import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

export const authorize = async (req, res, next) => {
  try {
    let token;

    const { id } = req.params;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    }

    if (user._id !== id && user.role !== "admin") {
      if (req.method === "PUT") {
        res.status(403).json({ message: "Forbidden" });
      }
      if (req.method === "DELETE") {
        res.status(403).json({ message: "Forbidden" });
      }
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export const userIsAdmin = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
    }

    if (user.role !== "admin") {
      res
        .status(401)
        .json({ message: "Only admin is allowed to perform this action" });
    }

    next();
  } catch (error) {
    next(error);
    res.status(401).json({
      message: "You are not an admin",
      error: error.message,
    });
  }
};
