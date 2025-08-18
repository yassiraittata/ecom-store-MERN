import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const port = process.env.PORT || 5050;
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

app.use(errorHandler);

connectDB();
app.listen(port, () => console.log("App is running on", port));
