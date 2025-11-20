export default function mostrarTarot() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <style>
            .tarot-container {
                text-align: center;
                padding: 30px;
                color: #fff;
                background: #0a0a0a;
                min-height: 80vh;
                border-radius: 20px;
            }

            .tarot-title {
                font-size: 28px;
                margin-bottom: 5px;
            }

            .tarot-subtitle {
                font-size: 14px;
                opacity: .7;
                margin-bottom: 25px;
            }

            .tarot-cards {
                display: flex;
                justify-content: center;
                gap: 30px;
                margin-top: 30px;
            }

            .tarot-card {
                width: 130px;
                height: 200px;
                border-radius: 12px;
                background: linear-gradient(135deg, #1e1e1e, #351f47);
                border: 2px solid #7c4fff;
                cursor: pointer;
                transition: transform .4s ease, box-shadow .4s ease;
                display: flex;
                justify-content: center;
                align-items: center;
                color: transparent;
                user-select: none;
            }

            .tarot-card:hover {
                transform: scale(1.08);
                box-shadow: 0 0 15px #7c4fff70;
            }

            .tarot-card.revealed {
                background: #1a1a1a;
                border-color: #c084fc;
                box-shadow: 0 0 12px #c084fc80;
                padding: 12px;
                color: #fff;
                flex-direction: column;
                text-align: center;
            }

            .tarot-content h3 {
                margin-bottom: 10px;
                color: #c084fc;
                font-size: 16px;
            }
        </style>

        <div class="tarot-container">
            <h2 class="tarot-title">✨ Horóscopo Tarot ✨</h2>
            <p class="tarot-subtitle">Elige 3 cartas para revelar tu energía, consejo y advertencia</p>

            <div class="tarot-cards">
                <div class="tarot-card" data-type="energia">?</div>
                <div class="tarot-card" data-type="consejo">?</div>
                <div class="tarot-card" data-type="advertencia">?</div>
            </div>
        </div>
    `;

    // Mensajes posibles
    const mensajes = {
        energia: [
            "Tu energía atraerá oportunidades importantes.",
            "Hoy sentirás claridad mental y fuerza personal.",
            "Momento ideal para tomar decisiones.",
            "Emociones estables, enfoque alto.",
            "Tu intuición estará más fuerte que nunca."
        ],
        consejo: [
            "No tomes decisiones apresuradas.",
            "Confía en tu intuición, no en la presión externa.",
            "Rodéate de personas que sumen a tu paz.",
            "Escucha antes de hablar.",
            "Agradece más, te abrirá caminos."
        ],
        advertencia: [
            "Evita discusiones innecesarias hoy.",
            "Cuidado con confiar demasiado rápido.",
            "No tomes riesgos financieros impulsivos.",
            "Atento a energías pesadas alrededor.",
            "Puede haber malentendidos, habla claro."
        ]
    };

    // Función para revelar carta
    document.querySelectorAll(".tarot-card").forEach(card => {
        card.addEventListener("click", () => {
            if (card.classList.contains("revealed")) return;

            const tipo = card.dataset.type;
            const mensaje = mensajes[tipo][Math.floor(Math.random() * mensajes[tipo].length)];

            card.classList.add("revealed");
            card.innerHTML = `
                <div class="tarot-content">
                    <h3>${tipo.toUpperCase()}</h3>
                    <p>${mensaje}</p>
                </div>
            `;
        });
    });
}
