import express from "express";
import { body } from "express-validator";

import { authenticate, isAdmin } from "../middlewares/authentication.js";


router.route("/").post(createCategoty);

export default router;
