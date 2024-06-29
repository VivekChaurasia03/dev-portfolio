import express from "express";
import {
    addNewApplication,
    getAllApplication,
    deleteApplication,
} from "../controllers/softwareApplicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
router.get("/getall", getAllApplication);

export default router;
