import express from "express";
import {
  addData,
  getAllTransactions,
  getTransactionsByUser,
  deleteTransaction,
} from "../controllers/index.js";

const router = express.Router();

router.post("/add", addData);

router.get("/transactions", getAllTransactions);

router.get("/transactions/:user_id", getTransactionsByUser);

router.delete("/transactions/:id", deleteTransaction);

export default router;
