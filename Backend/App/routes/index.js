import express from "express";
import { addData, getAllTransactions } from "../Controllers/index.js";

const router = express.Router();

router.post("/add", addData);
router.get("/transactions", getAllTransactions);

export default router;
