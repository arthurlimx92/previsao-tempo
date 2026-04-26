# 🌤️ Previsão do Tempo

Aplicação web de previsão do tempo com sugestão de roupas gerada por IA, background dinâmico de paisagens e busca por voz.

![Preview](./img/preview.png)

---

## ✨ Funcionalidades

- 🔍 Busca de clima por cidade
- 🎙️ Busca por reconhecimento de voz
- 🌡️ Exibição de temperatura, umidade e condição do tempo
- 🤖 Sugestão de roupa gerada por IA com base no clima atual
- 🖼️ Background dinâmico com paisagens aleatórias

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js + Express |
| API de Clima | [OpenWeatherMap](https://openweathermap.org/) |
| IA | [Groq API](https://console.groq.com/) — modelo `llama-3.3-70b-versatile` |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- Chave de API da [OpenWeatherMap](https://openweathermap.org/api)
- Chave de API da [Groq](https://console.groq.com/keys)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/previsao-tempo.git
cd previsao-tempo
```

2. Instale as dependências do backend:
```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto:
```env
GROQ_API_KEY=sua_chave_aqui
```

4. Inicie o servidor:
```bash
node server.js
```

5. Abra o `index.html` no navegador (recomendado usar Live Server no VS Code).

---

## 🔒 Variáveis de Ambiente

| Variável | Descrição |
|----------|-----------|
| `GROQ_API_KEY` | Chave da API da Groq para geração de sugestões pela IA |

> ⚠️ **Nunca suba o arquivo `.env` para o GitHub.** Ele já está no `.gitignore`.

---

## 📁 Estrutura do Projeto

```
previsao-tempo/
├── index.html       # Interface principal
├── styles.css       # Estilos e layout
├── scripts.js       # Lógica do frontend
├── server.js        # Backend Express (proxy para a IA)
├── .env             # Variáveis de ambiente (não versionar)
├── .gitignore
└── img/             # Ícones e imagens
```

---

## 🌐 Deploy

O frontend pode ser hospedado em qualquer serviço estático (GitHub Pages, Vercel, Netlify).  
O backend precisa de um serviço com suporte a Node.js, como o **[Render](https://render.com)** (gratuito).

Após o deploy do backend, atualize a URL no `scripts.js`:
```js
await fetch("https://seu-projeto.onrender.com/api/ia", { ... })
```

---

## 👨‍💻 Autor

Feito por [Arthur Lima](https://github.com/arthurlimx92)
