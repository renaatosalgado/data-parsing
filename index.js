import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import route from "./router.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(route);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
