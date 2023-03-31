import { Response, Request } from "express";
import UserSchema from "./login.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const userRegister = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await UserSchema.create({ ...body, password: hashPassword });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const status = req.query.status;
    if (status) {
      const userStatus = await UserSchema.find({ status });
      return res.status(400).send(userStatus);
    } else {
      const user = await UserSchema.find();
      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
export const getUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findById(id);
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteUserbyId = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.deleteOne({ id });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password required" });
  }
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not found" });
    } else {
      const confirmPassword = await bcrypt.compare(password, user.password);
      if (!confirmPassword) {
        return res.status(400).json({ message: "password not match" });
      } else {
        const accessToken = jwt.sign(
          { user },
          process.env.ACCESS_TOKEN_SECRET!
        );
        res.json({ accessToken: accessToken });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};
