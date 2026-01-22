import express from "express";
import routes from "./routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
