import express from "express";
import {
  userRegister,
  getAllUser,
  getUserbyId,
  deleteUserbyId,
  loginUser,
} from "./login.controller";
const route = express.Router();

route.post("/register", userRegister);
route.get("/users", getAllUser);
route.get("/user/:id", getUserbyId);
route.delete("/user/:id", deleteUserbyId);
route.post("/login", loginUser);

export const loginRoute = route;
