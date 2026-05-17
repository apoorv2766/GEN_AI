import express from "express";
import { generate } from "./generate.js";

const app = express();
const port = 3001;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to CharDPT!");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log(`Received message: ${message}`);
  const result = await generate(message);
  res.json({ message: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
