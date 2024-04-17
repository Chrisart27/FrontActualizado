import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import "./Mapa.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZm9yZmVzIiwiYSI6ImNsdXU1aDlpdzA2a2Qya3NmNGpiejFkaGcifQ.art5lpkho5W9uIW9XNXI2Q";

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
        setMarcadores((prev) => [...prev, marker]);

        if (arrastable) {
          marker.on("dragend", () => {
            const lngLat = marker.getLngLat();
            if (obtenerUbicacion) obtenerUbicacion([lngLat.lng, lngLat.lat]);
          });
        }
      });
    }
  }, [mapa.current]);

  useEffect(() => {
    if (mapa.current && !ubicacionUsuario.length && marcadores.length) {
      mapa.current.flyTo({
        center: marcadores[0].getLngLat(),
        zoom: 10,
      });
    }
  }, [marcadores, mapa.current]);

  useEffect(() => {
    if (mapa.current && ubicacionUsuario.length) {
      mapa.current.flyTo({
        center: ubicacionUsuario,
        zoom: 10,
      });
      const userMarker = new mapboxgl.Marker({ element: usuarioIcono })
        .setLngLat(ubicacionUsuario)
        .addTo(mapa.current);
    }
  }, [ubicacionUsuario, mapa.current]);

  return (
    <div className={`contenedor ${className}`}>
      <div ref={contenedorMapa} className="contenedor-mapa" />
    </div>
  );
}
