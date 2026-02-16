import dotenv from "dotenv";
dotenv.config();

import express from "express"
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import path from "path";
import { fileURLToPath } from "url";

connectDB();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});


app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
