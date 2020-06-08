import mongoose from "mongoose";
require("dotenv").config();

const url: string = process.env.MONGO!;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    return console.log(`Successfully connected to database`);
  })
  .catch((error) => {
    console.log("Error connecting to database: ", error);
  });

const db = mongoose.connection;

export default db;
