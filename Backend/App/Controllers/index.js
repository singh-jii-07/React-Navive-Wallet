import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();
const sql = neon(process.env.DATABASE_URL);

export const addData = async (req, res) => {
  try {
    const { user_id, title, amount, category } = req.body;

    if (!user_id || !title || !amount || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const transactions = await sql`
      INSERT INTO transactions (user_id, title, amount, category)
      VALUES (${user_id}, ${title}, ${amount}, ${category})
      RETURNING *
    `;

    res.status(200).json({
      message: "Transaction added successfully",
      transaction: transactions[0],
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await sql`SELECT * FROM transactions`;
    res.status(200).json({
      message: "All transactions fetched successfully",
      transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching transactions",
      error: error.message,
    });
  }
};
