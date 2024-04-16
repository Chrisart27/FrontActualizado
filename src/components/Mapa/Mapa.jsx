import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from "react";
import "./Mapa.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZm9yZmVzIiwiYSI6ImNsdXU1aDlpdzA2a2Qya3NmNGpiejFkaGcifQ.art5lpkho5W9uIW9XNXI2Q";

export default function Mapa({ gruas }) {
  const contenedorMapa = useRef(null);
  const mapa = useRef(null);

  useEffect(() => {
    if (mapa.current) return;
    mapa.current = new mapboxgl.Map({
      container: contenedorMapa.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-75.676956, 4.535173],
      zoom: 11,
    });
  }, []);

  return (
    <div className="contenedor">
      <div ref={contenedorMapa} className="contenedor-mapa" />
    </div>
  );
}
