import express from "express";
import {
  addData,
  getAllTransactions,
  getTransactionsByUser,
  deleteTransaction,
  getSummary
} from "../controllers/index.js";

const router = express.Router();

router.post("/add", addData);

router.get("/get", getAllTransactions);

router.get("/getone/:user_id", getTransactionsByUser);

router.delete("/delete/:id", deleteTransaction);
router.get("/summary", getSummary);

export default router;
