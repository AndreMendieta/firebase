import { db } from '../firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default function mostrarOriginal() {

  // ⬇️ Agregar estilos aquí mismo
  const style = document.createElement("style");
  style.textContent = `
    .zodiaco-container {
      max-width: 650px;
      margin: auto;
      margin-top: 30px;
      padding: 25px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 5px 18px rgba(0,0,0,0.08);
    }

    .zodiaco-container h2 {
      text-align: center;
      font-weight: bold;
      margin-bottom: 20px;
      color: #3b3b3b;
    }

    .zodiaco-container p {
      margin: 8px 0 4px;
      font-weight: 600;
      color: #494949;
    }

    .zodiaco-container input {
      width: 100%;
      padding: 12px;
      border-radius: 10px;
      border: 2px solid #e0e0e0;
      margin-bottom: 12px;
      transition: 0.2s;
    }

    .zodiaco-container input:focus {
      border-color: #4f46e5;
      background: #f9f9ff;
      outline: none;
    }

    .zodiaco-container button {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-weight: bold;
      transition: 0.2s;
    }

    .zodiaco-container button:hover {
      background: #3c39d0;
    }

    .zodiaco-json {
      margin-top: 20px;
      background: #f5f5f7;
      padding: 16px;
      border-radius: 12px;
      font-size: 14px;
      white-space: pre-wrap;
      overflow-x: auto;
      border: 1px solid #e3e3e3;
    }
  `;
  document.head.appendChild(style);
  // ⬆️ FIN estilos elegantes

  // Objeto inicial
  let signo = {
    nombre: "Aries",
    fecha: "21 marzo - 19 abril",
    elemento: "Fuego",
    color: "Rojo",
    numeroSuerte: 7,
    mensaje: "Hoy tendrás una energía increíble para iniciar proyectos."
  };

  // Contenedor principal
  const contenedor = document.getElementById("app");
  contenedor.innerHTML = "";

  // Contenedor elegante
  const wrapper = document.createElement("div");
  wrapper.className = "zodiaco-container";

  // Título
  const titulo = document.createElement("h2");
  titulo.textContent = "Editor del Signo Zodiacal";
  wrapper.appendChild(titulo);

  // Crear formulario
  const form = document.createElement("div");

  // JSON mostrado
  const resultado = document.createElement("pre");
  resultado.className = "zodiaco-json";
  resultado.textContent = JSON.stringify(signo, null, 2);

  const campos = [
    { key: "nombre", label: "Nombre del Signo" },
    { key: "fecha", label: "Fechas" },
    { key: "elemento", label: "Elemento" },
    { key: "color", label: "Color" },
    { key: "numeroSuerte", label: "Número de Suerte" },
    { key: "mensaje", label: "Mensaje del día" }
  ];

  // Inputs dinámicos
  campos.forEach(({ key, label }) => {
    const p = document.createElement("p");
    p.textContent = label;

    const input = document.createElement("input");
    input.placeholder = label;
    input.value = signo[key];

    input.oninput = () => {
      signo[key] = input.value;
      resultado.textContent = JSON.stringify(signo, null, 2);
    };

    form.appendChild(p);
    form.appendChild(input);
  });

  // Botón guardar
  const botonGuardar = document.createElement("button");
  botonGuardar.textContent = "Guardar Signo en Firebase";

  botonGuardar.onclick = async () => {
    try {
      await addDoc(collection(db, "zodiaco"), signo);
      alert("♈ Datos del signo guardados correctamente en Firebase!");
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("❌ Ocurrió un error al guardar.");
    }
  };

  form.appendChild(botonGuardar);

  // Agregar al wrapper
  wrapper.appendChild(form);
  wrapper.appendChild(resultado);

  // Mostrar
  contenedor.appendChild(wrapper);
}
