import express from "express";
import cors from "cors";
import { generate } from "./generate.js";

const app = express();
const port = process.env.PORT || 3001;




app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());



app.get("/", (req, res) => {
  console.log("Welcome to bhagwan ji");
  res.send("Welcome to ChatDPT!");
});

app.post("/chat", async (req, res) => {
  const { message, threadId } = req.body;

  //tdo validate above fields
  if (!message || !threadId) {
    res.status(400).json({ error: "Message and threadId are required" });
    return
  }

  console.log(`Received message: ${message} and threadId: ${threadId}`);
  const result = await generate(message, threadId);
  res.json({ message: result });
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
