import React from 'react'
import './Beneficios.css'

export default function Beneficio() {
  return (
    <section className='Beneficio'>
      <div className="containerImage">
        <img src="https://cdn.pixabay.com/photo/2018/05/11/23/45/highway-3392100_1280.jpg" alt="" />  
      </div>

      <div className="tituloBeneficio">
        <h1>Cuando pides un servicio en Gruapp obtienes:
        </h1>

      </div>
      <div className="containerBeneficio">
        <div className="lista">
            <ul>
                  <li>Soporte 24/7</li>
                  <li>30% de descuento para los dos primeros servicios</li>
                  <li>Atención inmediata</li>
                  <li>Cobertura a nivel nacional</li>
                  <li>Servicios prestados por grúas certificadas</li>
                  <li>Conductores profesionales</li>
                  <li>Cumplimiento de normativas de seguridad</li>
            </ul>
        </div>
      </div>
    </section>
  )
}
