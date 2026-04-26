import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ── Rota do Clima ──────────────────────────────────────
app.get("/api/clima", async (req, res) => {
  try {
    const { cidade } = req.query;

    if (!cidade) {
      return res.status(400).json({ erro: "Cidade não informada" });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar clima" });
  }
});

// ── Rota da IA ─────────────────────────────────────────
app.post("/api/ia", async (req, res) => {
  try {
    const { temp, umidade, cidade } = req.body;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Crie uma sugestão de roupa para ${temp}, ${umidade} em ${cidade}. Em 2 frases curtas.`
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      resposta: data.choices?.[0]?.message?.content || "Erro ao gerar resposta"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));