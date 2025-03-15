import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";

config();
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 5050;

app.listen(port, () => console.log("App is running on", port));
