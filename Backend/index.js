import express from "express";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import cors from 'cors'
import transactionRoutes from "./App/routes/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); 
app.use("/api", transactionRoutes); 

const sql = neon(process.env.DATABASE_URL);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
      )
    `;
    console.log(" Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
}

app.get("/", (req, res) => {
  res.send("Server is running ");
});

initDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`App is running on port ${process.env.PORT}`);
  });
});
