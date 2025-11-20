import { db } from "../firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

export default async function mostrarHome() {
  // Agregar estilos visuales
  const style = document.createElement("style");
  style.textContent = `
    .home-container {
      padding: 40px;
      min-height: 100vh;
      background: linear-gradient(135deg, #f0f4ff, #e6e9ff);
      animation: fadeIn 0.6s ease-in-out;
    }

    .titulo-home {
      text-align: center;
      color: #372b99;
      font-size: 38px;
      font-weight: 900;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }

    .subtitulo {
      text-align: center;
      color: #5a5a5a;
      margin-bottom: 35px;
      font-size: 17px;
    }

    .zodiaco-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 25px;
    }

    .zodiaco-card {
      background: white;
      padding: 25px;
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      position: relative;
      overflow: hidden;
      transition: .3s ease;
      cursor: pointer;
      animation: pop 0.3s ease-out;
    }

    .zodiaco-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    }

    .zodiaco-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 10px;
    }

    .zodiaco-icon {
      width: 45px;
      height: 45px;
      filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.2));
    }

    .zodiaco-card h2 {
      color: #312e81;
      margin: 0;
      font-size: 24px;
    }

    .zodiaco-card p {
      margin: 6px 0;
      color: #444;
      font-size: 15px;
    }

    /* Colores por elemento */
    .fuego { border-left: 8px solid #ff5722; }
    .aire  { border-left: 8px solid #00bcd4; }
    .tierra{ border-left: 8px solid #8bc34a; }
    .agua  { border-left: 8px solid #3f51b5; }

    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes pop {
      from { transform: scale(.95); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  // Contenedor
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = `
    <div class="home-container">
        <h1 class="titulo-home">🔮 Horóscopo Diario</h1>
        <p class="subtitulo">Descubre la energía de tu signo hoy</p>
        <p>Cargando signos...</p>
    </div>
  `;

  const homeContainer = document.querySelector(".home-container");

  // Mapa de iconos de signos
  const iconos = {
    "Aries": "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    "Tauro": "https://cdn-icons-png.flaticon.com/512/616/616430.png",
    "Géminis": "https://cdn-icons-png.flaticon.com/512/616/616435.png",
    "Cáncer": "https://cdn-icons-png.flaticon.com/512/616/616418.png",
    "Leo": "https://cdn-icons-png.flaticon.com/512/616/616422.png",
    "Virgo": "https://cdn-icons-png.flaticon.com/512/616/616432.png",
    "Libra": "https://cdn-icons-png.flaticon.com/512/616/616426.png",
    "Escorpio": "https://cdn-icons-png.flaticon.com/512/616/616437.png",
    "Sagitario": "https://cdn-icons-png.flaticon.com/512/616/616440.png",
    "Capricornio": "https://cdn-icons-png.flaticon.com/512/616/616414.png",
    "Acuario": "https://cdn-icons-png.flaticon.com/512/616/616412.png",
    "Piscis": "https://cdn-icons-png.flaticon.com/512/616/616434.png"
  };

  try {
    const querySnapshot = await getDocs(collection(db, "zodiaco"));

    if (querySnapshot.empty) {
      homeContainer.innerHTML += "<p>No hay signos aún.</p>";
      return;
    }

    const grid = document.createElement("div");
    grid.classList.add("zodiaco-grid");

    querySnapshot.forEach((doc) => {
      const signo = doc.data();

      const card = document.createElement("div");
      card.classList.add("zodiaco-card");

      // Asignar color por elemento
      const elemento = signo.elemento.toLowerCase();
      if (["fuego", "aire", "tierra", "agua"].includes(elemento)) {
        card.classList.add(elemento);
      }

      card.innerHTML = `
        <div class="zodiaco-header">
          <img class="zodiaco-icon" src="${iconos[signo.nombre] || ""}">
          <h2>${signo.nombre}</h2>
        </div>

        <p><strong>Fechas:</strong> ${signo.fecha}</p>
        <p><strong>Elemento:</strong> ${signo.elemento}</p>
        <p><strong>Color:</strong> ${signo.color}</p>
        <p><strong>Número de Suerte:</strong> ${signo.numeroSuerte}</p>
        <p><strong>Mensaje:</strong> ${signo.mensaje}</p>
      `;

      grid.appendChild(card);
    });

    homeContainer.appendChild(grid);

  } catch (error) {
    console.error("Error al cargar:", error);
    homeContainer.innerHTML += "<p>Error al cargar los signos 😢</p>";
  }
}
