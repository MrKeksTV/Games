import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const characters = {
  luna: "Du bist Luna, freundlich, süß und positiv.",
  alex: "Du bist Alex, logisch und technisch.",
  mia: "Du bist Mia, kreativ und verspielt."
};

app.post("/chat", async (req, res) => {
  const { message, character } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [
      { role: "system", content: characters[character] || characters.luna },
      { role: "user", content: message }
    ]
  });

  res.json({ reply: response.choices[0].message.content });
});

app.listen(3000, () => console.log("Server läuft auf Port 3000"));
