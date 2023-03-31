import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";
import { loginRoute } from "./src/modules/loginAuth/login.routes";
const Port = process.env.PORT;
import mongoose from "mongoose";
import { config } from "./src/modules/config/config";

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => console.log("Connected!"))
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());

app.use("/api", loginRoute);

app.listen(Port, () => {
  console.log(`Server running on Localhost//${Port}`);
});
