// export default async function handler(req, res) {
//   try {
//     const { temp, umidade, cidade } = req.body;

//     const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         model: "llama-3.3-70b-versatile",
//         messages: [
//           {
//             role: "user",
//             content: `Crie uma sugestão de roupa para ${temp}, ${umidade} em ${cidade}. Em 2 frases curtas.`
//           }
//         ]
//       })
//     });

//     const data = await response.json();

//     res.status(200).json({
//       resposta: data.choices?.[0]?.message?.content || "Sem resposta"
//     });

//   } catch (error) {
//     res.status(500).json({ erro: "Erro na IA" });
//   }
// }