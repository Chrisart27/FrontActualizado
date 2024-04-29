// Gruas.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gruas.css";
import Footer from "../footer/Footer";
import GruasP2 from "./GruasP2/GruasP2";
import { SERVER_URL } from "../../constants/constants";
import { useSelector } from "react-redux";
import Mapa from "../Mapa/Mapa";
import { manejarClick } from "../../constants/utils";

const Gruas = () => {
  const [gruas, setGruas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const usuariosEnLinea = useSelector((state) => state.client?.usersOnline);
  const [ubicacionUsuario, setUbicacionUsuario] = useState([]);

  useEffect(() => {
    axios
      .get(SERVER_URL + "/getGruasInfo")
      .then((response) => {
        console.log(response.data);
        setGruas(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener grúas desde el backend:", error);
      });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUbicacionUsuario([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      });
    }
  }, []);

  // const filtrarGruas = () => {
  //   if (!busqueda.trim()) {
  //     return gruas; // Mostrar todas las grúas si no hay búsqueda
  //   }
  //   const terminoBusqueda = busqueda.trim().toLowerCase();

  //   if (/^\d+kg$/.test(terminoBusqueda)) {
  //     // Búsqueda por capacidad
  //     const capacidadBusqueda = parseInt(terminoBusqueda);
  //     return gruas.filter((grua) => grua.capacidad === capacidadBusqueda);
  //   } else if (/^\d+$/.test(terminoBusqueda)) {
  //     // Búsqueda por modelo
  //     const modeloBusqueda = parseInt(terminoBusqueda);
  //     return gruas.filter((grua) => grua.modelo === modeloBusqueda);
  //   } else {
  //     // Búsqueda por ubicación
  //     return gruas.filter((grua) => grua.ubicacion.toLowerCase().includes(terminoBusqueda));
  //   }
  // };

  const openWhatsAppChat = (grua) => {
    manejarClick(grua.idCliente, grua.idGrua);
    // Comprobar si la propiedad 'whatsapp' existe en el objeto 'grua'
    if (grua && grua.whatsapp) {
      const whatsappNumber = grua.whatsapp;
      const message = "Hola, estoy interesado en tus servicios de grúa.";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      console.error(
        'El objeto grua no tiene la propiedad "whatsapp" definida.'
      );
      // Puedes manejar esto de acuerdo a tus necesidades, por ejemplo, mostrando un mensaje de error.
    }
  };

  return (
    <div className="gruas-container">
      <GruasP2 />
      <div className="containerFilter">
        <input
          type="text"
          placeholder="Buscar..."
          className="input-buscador"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      {gruas.length && (
        <Mapa
          objetos={gruas}
          ubicacionUsuario={ubicacionUsuario}
          usuariosEnLinea={usuariosEnLinea}
        />
      )}
      <div className="gruas-list">
        {gruas.map((grua) => (
          <div key={grua.idGrua} className="grua-item">
            <img
              src={grua.foto.replace("/ruta-base-imagenes/", "")}
              alt={grua.marca}
              className="grua-imagen"
            />
            <h2 className="tituloGruas">{grua.marca}</h2>
            <p>Modelo: {grua.modelo}</p>
            <p>Capacidad: {grua.capacidad} kg</p>
            <p>Ubicacion: {grua.ubicacion}</p>
            <div className="grua-status">
              <div className="grua-status-icon-container">
                <div
                  className={`grua-status-icon ${
                    usuariosEnLinea?.some(
                      (usuario) => usuario.idCliente === grua.idCliente
                    )
                      ? "grua-status-on"
                      : "grua-status-off"
                  }`}
                />
              </div>
              <p className="grua-status-text">
                {usuariosEnLinea?.some(
                  (usuario) => usuario.idCliente === grua.idCliente
                )
                  ? "En Línea"
                  : "Desconectado"}
              </p>
            </div>
            <div className="contactar-btn-contenedor">
              <button
                className="contactar-btn"
                onClick={() => openWhatsAppChat(grua)}
              >
                {" "}
                WhatsApp{" "}
                <img
                  className="logoWhatsapp"
                  src="https://cdn-icons-png.flaticon.com/128/15047/15047389.png"
                  alt=""
                />{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Gruas;
