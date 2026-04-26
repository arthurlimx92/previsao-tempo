const API_URL = "https://seu-projeto.onrender.com" // 👈 troque pela URL do Render após o deploy

async function cliquenobotao() {
    let cidade = document.querySelector(".imput-cidade").value.trim()
    if (!cidade) return

    let caixa = document.querySelector(".caixa-media")
    caixa.innerHTML = `<div class="loading-dots"><span></span><span></span><span></span></div>`

    try {
        let respostaServidor = await fetch(`${API_URL}/api/clima?cidade=${encodeURIComponent(cidade)}`)
        let dadosJson = await respostaServidor.json()

        if (dadosJson.cod !== 200) {
            caixa.innerHTML = `<p style="color:rgba(255,255,255,0.5); font-size:14px;">Cidade não encontrada.</p>`
            return
        }

        const temp = Math.floor(dadosJson.main.temp)
        const umidade = dadosJson.main.humidity
        const icon = dadosJson.weather[0].icon
        const descricao = dadosJson.weather[0].description

        caixa.innerHTML = `
            <div class="weather-header">
                <h2 class="cidade">${dadosJson.name}</h2>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${descricao}">
            </div>

            <div class="temp-row">
                <span class="temp">${temp}</span>
                <span class="temp-unit">°C</span>
            </div>

            <div class="info-pills">
                <span class="pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z"/></svg>
                    ${dadosJson.name}
                </span>
                <span class="pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/><circle cx="12" cy="12" r="4"/></svg>
                    ${descricao}
                </span>
                <span class="pill">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/></svg>
                    Umidade: ${umidade}%
                </span>
            </div>

            <button class="botao-ia" onclick="pedirSugestaoRoupa()">✦ Sugestão de Roupa</button>

            <div id="resposta-wrapper" style="display:none" class="resposta-ia-wrapper">
                <div class="ia-label">IA Stylist</div>
                <p class="resposta-ia" id="resposta-ia-texto"></p>
            </div>
        `
    } catch (err) {
        caixa.innerHTML = `<p style="color:rgba(255,255,255,0.5); font-size:14px;">Erro ao buscar dados.</p>`
    }
}

function detectaVoz() {
    let reconhecimento = new window.webkitSpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.start()

    reconhecimento.onresult = function (evento) {
        let textoTranscrito = evento.results[0][0].transcript
        document.querySelector(".imput-cidade").value = textoTranscrito
        cliquenobotao()
    }
}

async function pedirSugestaoRoupa() {
    const btn = document.querySelector(".botao-ia")
    const wrapper = document.getElementById("resposta-wrapper")
    const texto = document.getElementById("resposta-ia-texto")

    const temp = document.querySelector(".temp").textContent + "°C"
    const umidade = document.querySelector(".pill:last-of-type").textContent.trim()
    const cidade = document.querySelector(".cidade").textContent

    btn.disabled = true
    btn.textContent = "Consultando IA..."

    wrapper.style.display = "block"
    texto.innerHTML = `<div class="loading-dots"><span></span><span></span><span></span></div>`

    try {
        let resposta = await fetch(`${API_URL}/api/ia`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ temp, umidade, cidade })
        })

        let dadosJson = await resposta.json()
        texto.textContent = dadosJson.resposta
    } catch (err) {
        texto.textContent = "Erro ao obter sugestão."
    } finally {
        btn.disabled = false
        btn.textContent = "✦ Sugestão de Roupa"
    }
}