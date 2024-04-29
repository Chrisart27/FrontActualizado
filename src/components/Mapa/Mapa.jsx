import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import "./Mapa.css";
import { useSelector } from "react-redux";
import { manejarClick } from "../../constants/utils";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZm9yZmVzIiwiYSI6ImNsdXU1aDlpdzA2a2Qya3NmNGpiejFkaGcifQ.art5lpkho5W9uIW9XNXI2Q";

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la tierra en kms
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en kms
  return distance;
}

function deg2rad(deg) {
  // convertir grados a radianes
  return deg * (Math.PI / 180);
}

function revisarEnLinea(usuariosEnLinea, idCliente) {
  return usuariosEnLinea.some((usuario) => usuario.idCliente === idCliente);
}

export default function Mapa({
  objetos = [],
  arrastable = false,
  obtenerUbicacion = (ubicacion) => {},
  ubicacionUsuario = [],
  className = "",
}) {
  const contenedorMapa = useRef(null);
  const mapa = useRef(null);
  const [marcadores, setMarcadores] = useState([]);
  const usuariosEnLinea = useSelector((state) => state.client?.usersOnline);

  const usuarioIcono = new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="iconoUsuario">
    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
  </svg>  
  `,
    "image/svg+xml"
  ).documentElement;

  useEffect(() => {
    if (mapa.current) return;
    mapa.current = new mapboxgl.Map({
      container: contenedorMapa.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-75.676956, 4.535173],
      zoom: 12,
    });
  }, []);

  useEffect(() => {
    if (mapa.current && objetos.length && !marcadores.length) {
      objetos.forEach((objeto) => {
        if (!objeto || !objeto.latitud || !objeto.longitud) return;
        const marker = new mapboxgl.Marker({ draggable: arrastable })
          .setLngLat([objeto.longitud, objeto.latitud])
          .addTo(mapa.current);
        setMarcadores((prev) => [...prev, { marker, objeto }]);

        if (arrastable) {
          marker.on("dragend", () => {
            const lngLat = marker.getLngLat();
            if (obtenerUbicacion) obtenerUbicacion([lngLat.lng, lngLat.lat]);
          });
        }
        marker.setPopup(
          new mapboxgl.Popup({ closeButton: false })
            .setHTML(`<div class="popup">
          <div class="${
            revisarEnLinea(usuariosEnLinea, objeto.idCliente)
              ? "online"
              : "offline"
          }">
            ${
              revisarEnLinea(usuariosEnLinea, objeto.idCliente)
                ? "En línea"
                : "Desconectado"
            }
          </div>
            <img src="${objeto.foto}" alt="${objeto.marca}" />
            <h3>${objeto.marca}</h3>
            <p>Modelo: ${objeto.modelo}</p>
            <p>Capacidad: ${objeto.capacidad}</p>
            <a
              href="https://wa.me/${objeto.whatsapp}?text=${encodeURIComponent(
            "Hola, estoy interesado en tus servicios de grúa."
          )}"
              target="_blank"
              class="contactar-btn"
              id="whatsapp-btn"
              idCliente="${objeto.idCliente}"
              idGrua="${objeto.idGrua}"
            >
              WhatsApp
              <img
                class="logoWhatsapp"
                src="https://cdn-icons-png.flaticon.com/128/15047/15047389.png"
                alt=""
              />
            </a>
            </div>
          </div>`)
        );
      });
    }
  }, [mapa.current]);

  useEffect(() => {
    if (mapa.current && !ubicacionUsuario.length && marcadores.length) {
      mapa.current.flyTo({
        center: marcadores[0].marker.getLngLat(),
        zoom: 10,
      });
    }
  }, [marcadores, mapa.current]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const whatsappButton = document.getElementById("whatsapp-btn");
      if (whatsappButton && !whatsappButton.hasClickListener) {
        whatsappButton.addEventListener("click", () => {
          manejarClick(
            whatsappButton.getAttribute("idCliente"),
            whatsappButton.getAttribute("idGrua")
          );
        });
        whatsappButton.hasClickListener = true;
      }
    });

    observer.observe(document, { childList: true, subtree: true });

    // Cleanup function to disconnect the MutationObserver when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (mapa.current && ubicacionUsuario.length) {
      mapa.current.flyTo({
        center: ubicacionUsuario,
        zoom: 10,
      });
      const userMarker = new mapboxgl.Marker({ element: usuarioIcono })
        .setLngLat(ubicacionUsuario)
        .addTo(mapa.current);

      marcadores.forEach((marcador) => {
        marcador.marker.setPopup(
          new mapboxgl.Popup({ closeButton: false })
            .setHTML(`<div class="popup">
            <div class="${
              revisarEnLinea(usuariosEnLinea, marcador.objeto.idCliente)
                ? "online"
                : "offline"
            }">
              ${
                revisarEnLinea(usuariosEnLinea, marcador.objeto.idCliente)
                  ? "En línea"
                  : "Desconectado"
              }
            </div>
        <img src="${marcador.objeto.foto}" alt="${marcador.objeto.marca}" />
        <h3>${marcador.objeto.marca}</h3>
        <p>Modelo: ${marcador.objeto.modelo}</p>
        <p>Capacidad: ${marcador.objeto.capacidad}</p>
        <p>A solo ${getDistance(
          marcador.objeto.latitud,
          marcador.objeto.longitud,
          ubicacionUsuario[1],
          ubicacionUsuario[0]
        ).toFixed(2)}
        km</p>
        <a
          href="https://wa.me/${
            marcador.objeto.whatsapp
          }?text=${encodeURIComponent(
            "Hola, estoy interesado en tus servicios de grúa."
          )}"
          target="_blank"
          class="contactar-btn"
          id="whatsapp-btn"
          idCliente="${marcador.objeto.idCliente}"
          idGrua="${marcador.objeto.idGrua}"
        >
          WhatsApp
          <img
            class="logoWhatsapp"
            src="https://cdn-icons-png.flaticon.com/128/15047/15047389.png"
            alt=""
          />
        </a>
        </div>`)
        );
      });
    }
  }, [ubicacionUsuario, mapa.current]);

  return (
    <div className={`contenedor ${className}`}>
      <div ref={contenedorMapa} className="contenedor-mapa" />
    </div>
  );
}
