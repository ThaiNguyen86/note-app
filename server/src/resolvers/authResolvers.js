import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config(); // Đọc biến từ file .env

export const authResolvers = {
  Mutation: {
    register: async (_, { username, password }) => {
      // Kiểm tra username có tồn tại chưa
      const existingUser = await User.findOne({ username });
      if (existingUser) throw new Error("Username already exists");

      // Hash mật khẩu và lưu người dùng mới
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();

      // Tạo token
      const token = jwt.sign({ userId: newUser.id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return { token, user: newUser };
    },

    login: async (_, { username, password }) => {
      // Tìm người dùng theo username
      const user = await User.findOne({ username });
      if (!user) throw new Error("Invalid username or password");

      // Kiểm tra mật khẩu
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid username or password");

      // Tạo token
      const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      return { token, user };
    },
  },
};
