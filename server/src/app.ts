import express, { Application, Request, Response } from "express";
import db from "./db";
import cors from "cors";
import router from "./router";
require("dotenv").config();
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(router);
app.listen(process.env.PORT, () => {
  db.on;
  console.log(`Server Started on port ${process.env.PORT}`);
});
