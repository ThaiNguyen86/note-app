import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config(); // Đọc biến từ file .env

export const authMiddleware = (req) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  if (!token) throw new Error("Authentication required");

  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    return payload.userId;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
