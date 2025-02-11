import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./src/db/index.js";
import userRoute from "./src/routes/User.routes.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000
app.use(cors());
app.use(cookieParser());

app.use(express.json());

app.use("/api/v1",  userRoute)

app.get("/",(req, res) => {
  res.status(200).json({ message: "Hello from Vercel!" });
})


connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
