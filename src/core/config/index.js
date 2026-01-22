import express from "express";
import routes from "./routes.js";
import cors from "cors";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
