import express from "express";
import {
  addData,
  getAllTransactions,
  getTransactionsByUser,
  deleteTransaction,
} from "../controllers/index.js";

const router = express.Router();

router.post("/add", addData);

router.get("/get", getAllTransactions);

router.get("/getone/:user_id", getTransactionsByUser);

router.delete("/delete/:id", deleteTransaction);

export default router;
