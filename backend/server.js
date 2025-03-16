import path from "path";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

const port = process.env.PORT;

connectDB();

app.listen(port, () => console.log("App is running on", port));
